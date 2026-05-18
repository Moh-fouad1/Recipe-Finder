import csv
import io
import logging
from datetime import datetime

from django.http import HttpResponse
from django.utils import timezone
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from .models import Recipe
from . import services

logger = logging.getLogger('recipes')

CSV_HEADERS = [
    'ID',
    'Name',
    'Course',
    'Description',
    'Ingredients',
    'Created At',
    'Updated At',
]


def get_filtered_recipes_for_export(query: str = '', course: str = ''):
    """Same filters as the manage page; prefetch ingredients for export rows."""
    recipe_ids = [r.id for r in services.filter_recipes(query, course)]
    return (
        Recipe.objects.filter(id__in=recipe_ids)
        .prefetch_related('ingredients')
        .order_by('name')
    )


def _format_ingredients(recipe) -> str:
    parts = [f'{ing.quantity} {ing.name}' for ing in recipe.ingredients.all()]
    return '; '.join(parts) if parts else ''


def _recipe_rows(recipes):
    for recipe in recipes:
        yield [
            recipe.id,
            recipe.name,
            recipe.course,
            recipe.description,
            _format_ingredients(recipe),
            timezone.localtime(recipe.created_at).strftime('%Y-%m-%d %H:%M'),
            timezone.localtime(recipe.updated_at).strftime('%Y-%m-%d %H:%M'),
        ]


def _export_filename(prefix: str, extension: str) -> str:
    stamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    return f'{prefix}_{stamp}.{extension}'


def build_export_csv_response(recipes, username: str) -> HttpResponse:
    """Return a downloadable CSV of recipe data."""
    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(CSV_HEADERS)
    for row in _recipe_rows(recipes):
        writer.writerow(row)

    response = HttpResponse(buffer.getvalue(), content_type='text/csv; charset=utf-8')
    response['Content-Disposition'] = f'attachment; filename="{_export_filename("recipes", "csv")}"'
    logger.info('Admin %s exported %s recipes to CSV', username, recipes.count())
    return response


def build_export_pdf_response(recipes, username: str, query: str = '', course: str = '') -> HttpResponse:
    """Return a downloadable PDF report of recipe data."""
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=landscape(letter),
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
    )
    styles = getSampleStyleSheet()
    story = []

    title = Paragraph('<b>Recipe Finder — Recipe Export</b>', styles['Title'])
    story.append(title)
    story.append(Spacer(1, 12))

    filters = []
    if query:
        filters.append(f'Search: {query}')
    if course:
        filters.append(f'Course: {course}')
    meta = f'Generated: {timezone.localtime().strftime("%Y-%m-%d %H:%M")} | Total: {recipes.count()}'
    if filters:
        meta += ' | ' + ' | '.join(filters)
    story.append(Paragraph(meta, styles['Normal']))
    story.append(Spacer(1, 16))

    # Table data with wrapped description/ingredients via Paragraph for long text.
    cell_style = styles['BodyText']
    table_data = [['ID', 'Name', 'Course', 'Description', 'Ingredients', 'Created', 'Updated']]

    for recipe in recipes:
        table_data.append([
            recipe.id,
            Paragraph(recipe.name, cell_style),
            recipe.course,
            Paragraph((recipe.description or '')[:500], cell_style),
            Paragraph(_format_ingredients(recipe)[:400] or '—', cell_style),
            timezone.localtime(recipe.created_at).strftime('%Y-%m-%d'),
            timezone.localtime(recipe.updated_at).strftime('%Y-%m-%d'),
        ])

    col_widths = [0.7 * inch, 1.4 * inch, 1.1 * inch, 2.5 * inch, 2.2 * inch, 0.9 * inch, 0.9 * inch]
    table = Table(table_data, colWidths=col_widths, repeatRows=1)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e67e22')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.25, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f9f9f9')]),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(table)

    doc.build(story)
    pdf = buffer.getvalue()
    buffer.close()

    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{_export_filename("recipes", "pdf")}"'
    logger.info('Admin %s exported %s recipes to PDF', username, recipes.count())
    return response

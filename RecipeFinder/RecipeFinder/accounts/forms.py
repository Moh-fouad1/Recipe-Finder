from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


class RecipeLoginForm(AuthenticationForm):
    """Match client login field ids and layout."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        common = {'class': 'form-control'}
        self.fields['username'].widget.attrs.update({'id': 'username', 'autocomplete': 'username', **common})
        self.fields['password'].widget.attrs.update({'id': 'password', 'autocomplete': 'current-password', **common})


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'id': 'firstname'}))
    last_name = forms.CharField(max_length=30, required=True, widget=forms.TextInput(attrs={'id': 'lastname'}))
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'id': 'email'}))
    phone = forms.CharField(max_length=15, required=False, widget=forms.TextInput(attrs={'id': 'phonenumber'}))
    account_type = forms.ChoiceField(
        choices=[('user', 'User'), ('admin', 'Admin')],
        required=True,
        widget=forms.Select(attrs={'id': 'AccountType'}),
    )
    accept_terms = forms.BooleanField(
        required=True,
        label='Accept Terms and Conditions',
        widget=forms.CheckboxInput(attrs={'id': 'terms'}),
    )

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'id': 'username'})
        pw_attrs = {'class': 'form-control'}
        self.fields['password1'].widget.attrs.update({'id': 'password', **pw_attrs})
        self.fields['password2'].widget.attrs.update({'id': 'confirm_password', **pw_attrs})
        for name in ('password1', 'password2'):
            self.fields[name].help_text = ''

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        if commit:
            user.save()
            user.profile.phone = self.cleaned_data.get('phone') or ''
            user.profile.account_type = self.cleaned_data['account_type']
            user.profile.save()
        return user
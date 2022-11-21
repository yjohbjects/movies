from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from django.conf import settings

from allauth.account.adapter import get_adapter

from dj_rest_auth.registration.serializers import RegisterSerializer


# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = get_user_model()
#         fields = ['username', 'password', 'nickname']


class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(max_length=20)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['nickname'] = self.validated_data.get('nickname', '')
        return data_dict


class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('nickname',)
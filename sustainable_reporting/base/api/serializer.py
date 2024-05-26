from rest_framework import serializers
from .. import models

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shipment
        fields = '__all__'

class RiskAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RiskAssessment
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Suplier
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Certificate
        fields = '__all__'

class SupplyChainSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SupplyChain
        fields = '__all__'

class ComplianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Compliance
        fields = '__all__'

class BasicSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['username', 'password', 'email']
    def create(self, validated_data):
        user = models.CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class AdditionalDetailsSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    class Meta:
        model = models.Suplier
        fields = ['supplier_name', 'country', 'contact_name', 'email', 'phone', 'user_id']

    def create(self, validated_data):
        user_id = self.context.get('user_id')
        supplier = models.Suplier.objects.create(
            supplier_name=validated_data['supplier_name'],
            country=validated_data['country'],
            contact_name=validated_data['contact_name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            user_id = user_id
        )
        return supplier
    
class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shipment
        exclude = ['shipment_id']

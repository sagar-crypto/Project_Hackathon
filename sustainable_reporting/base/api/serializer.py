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

class SignupSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128)
    supplier_name = serializers.CharField(max_length=100)
    country = serializers.CharField(max_length=100)
    contact_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=15)

    def create_user(self, validated_data):
        user = models.User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        models.Supplier.objects.create(
            user=user,
            supplier_name=validated_data['supplier_name'],
            country=validated_data['country'],
            contact_name=validated_data['contact_name'],
            email=validated_data['email'],
            phone=validated_data['phone']
        )
        return user

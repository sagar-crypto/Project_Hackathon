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


class AdditionalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Suplier
        fields = ['supplier_name', 'country', 'contact_name', 'phone']

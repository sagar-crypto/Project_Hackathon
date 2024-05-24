from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('supplier', 'supplier'),
    ]
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='supplier')
class Suplier(models.Model):
    supplier_id = models.AutoField(primary_key=True)
    supplier_name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    def __str__(self):
        return self.supplier_name

class Certificate(models.Model):
    certificate_id = models.AutoField(primary_key=True)
    certificate_name = models.CharField(max_length=255)
    certificate_url = models.CharField(max_length=255)
    issued_by = models.CharField(max_length=255)
    valid_until = models.DateTimeField()

    def __str__(self):
        return self.certificate_name

class Shipment(models.Model):
    shipment_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=255)
    supplier_id = models.ForeignKey(Suplier, on_delete = models.SET_NULL, null = True)
    product_category = models.CharField(max_length=255)
    price = models.IntegerField()
    units_in_stock = models.IntegerField()
    country_of_production = models.CharField(max_length=255)
    certificate_id = models.ForeignKey(Certificate, on_delete = models.SET_NULL, null = True)
    DOP_manufacture = models.DateTimeField()
    geolocation = models.CharField(max_length=255)
    transport_mode = models.CharField(max_length=255)
    carbon_emissions = models.IntegerField()
    start_location = models.CharField(max_length=255)
    destination_location = models.CharField(max_length=255)
    proof_certificate_1 = models.IntegerField()
    proof_certificate_2 = models.IntegerField()
    self_confirmation = models.CharField(max_length=255)
    signature = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    form_submited_date = models.DateTimeField()

    def __str__(self):
        return self.product_name
    
class RiskAssessment(models.Model):
    risk_assessment_id = models.AutoField(primary_key=True)
    supplier_id = models.ForeignKey(Suplier, on_delete = models.SET_NULL, null = True)
    risk_level = models.CharField(max_length=255)
    assessment_date = models.CharField(max_length=255)  # Consider changing this to DateField
    assessor = models.CharField(max_length=255)
    comments = models.TextField()

    def __str__(self):
        return f"Risk Assessment {self.risk_assessment_id} - {self.risk_level}"

class SupplyChain(models.Model):
    supply_chain_id = models.AutoField(primary_key=True)
    supplier_id = models.ForeignKey(Suplier, on_delete = models.SET_NULL, null = True)
    from_location = models.CharField(max_length=255)
    to_location = models.CharField(max_length=255)
    transport_mode = models.CharField(max_length=255)
    carbon_emissions = models.IntegerField()

    def __str__(self):
        return f"Supply Chain {self.supply_chain_id} from {self.from_location} to {self.to_location}"


class Compliance(models.Model):
    compliance_id = models.AutoField(primary_key=True)
    supplier_id = models.ForeignKey(Suplier, on_delete = models.SET_NULL, null = True)
    shipment_id = models.ForeignKey(Shipment, on_delete = models.SET_NULL, null = True)
    certificate_id = models.ForeignKey(Certificate, on_delete = models.SET_NULL, null = True)
    compliance_date = models.DateTimeField()

    def __str__(self):
        return f"Compliance {self.compliance_id} on {self.compliance_date}"


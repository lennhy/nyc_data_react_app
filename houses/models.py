from django.db import models

# Create your models here.
class Building(models.Model):
    violationid = models.IntegerField(null=True)
    buildingid = models.IntegerField(null=True)
    currentstatusid = models.IntegerField(null=True)
    noticeofviolationid = models.IntegerField(null=True)

    boro = models.TextField()
    housenumber = models.TextField()
    streetname = models.TextField()
    apartment = models.TextField()
    zip = models.TextField()
    story = models.TextField()
    violationclass = models.TextField()
    novdescription = models.TextField()
    currentstatus = models.TextField()
    novtype = models.TextField()
    violationstatus = models.TextField()
    neighborhood = models.TextField()

    inspectiondate = models.DateTimeField()
    approveddate = models.DateTimeField()
    originalcertifybydate = models.DateTimeField()
    originalcorrectbydate = models.DateTimeField()
    newcertifybydate = models.DateTimeField()
    newcorrectbydate = models.DateTimeField()
    certifieddate = models.DateTimeField()
    novissueddate = models.DateTimeField()
    currentstatusdate = models.DateTimeField()

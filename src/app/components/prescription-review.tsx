import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { FileText, CheckCircle2, X, Clock, User, Calendar } from 'lucide-react';

const prescriptionsData = [
  {
    id: 'PRX-2001',
    customer: 'John Doe',
    submittedDate: '2026-01-17 10:30 AM',
    medicines: [
      { name: 'Amoxicillin 500mg', quantity: 30, dosage: 'Take 1 tablet 3 times daily' },
    ],
    doctorName: 'Dr. Sarah Williams',
    doctorLicense: 'MD-12345',
    validUntil: '2026-04-17',
    status: 'Pending',
    prescriptionImage: 'prescription_scan.jpg',
  },
  {
    id: 'PRX-2002',
    customer: 'Jane Smith',
    submittedDate: '2026-01-17 09:15 AM',
    medicines: [
      { name: 'Lisinopril 10mg', quantity: 30, dosage: 'Take 1 tablet daily' },
    ],
    doctorName: 'Dr. Michael Chen',
    doctorLicense: 'MD-67890',
    validUntil: '2026-07-17',
    status: 'Pending',
    prescriptionImage: 'prescription_scan2.jpg',
  },
  {
    id: 'PRX-2003',
    customer: 'Alice Williams',
    submittedDate: '2026-01-16 04:20 PM',
    medicines: [
      { name: 'Metformin 850mg', quantity: 60, dosage: 'Take 1 tablet twice daily with meals' },
    ],
    doctorName: 'Dr. Robert Johnson',
    doctorLicense: 'MD-24680',
    validUntil: '2026-06-16',
    status: 'Approved',
    approvedBy: 'Pharmacist Lisa Anderson',
    approvedDate: '2026-01-16 05:00 PM',
    prescriptionImage: 'prescription_scan3.jpg',
  },
  {
    id: 'PRX-2004',
    customer: 'Tom Brown',
    submittedDate: '2026-01-16 02:10 PM',
    medicines: [
      { name: 'Atorvastatin 20mg', quantity: 30, dosage: 'Take 1 tablet at bedtime' },
    ],
    doctorName: 'Dr. Emily Davis',
    doctorLicense: 'MD-13579',
    validUntil: '2026-05-16',
    status: 'Rejected',
    rejectedBy: 'Pharmacist Lisa Anderson',
    rejectedDate: '2026-01-16 03:00 PM',
    rejectionReason: 'Prescription image is unclear. Please upload a clearer image.',
    prescriptionImage: 'prescription_scan4.jpg',
  },
];

export function PrescriptionReview() {
  const [prescriptions, setPrescriptions] = useState(prescriptionsData);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [reviewNote, setReviewNote] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (id: string) => {
    setPrescriptions(prescriptions.map(prx => 
      prx.id === id ? {
        ...prx,
        status: 'Approved',
        approvedBy: 'Current Pharmacist',
        approvedDate: new Date().toLocaleString(),
      } : prx
    ));
    setSelectedPrescription(null);
    setReviewNote('');
  };

  const handleReject = (id: string) => {
    if (!reviewNote.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    setPrescriptions(prescriptions.map(prx => 
      prx.id === id ? {
        ...prx,
        status: 'Rejected',
        rejectedBy: 'Current Pharmacist',
        rejectedDate: new Date().toLocaleString(),
        rejectionReason: reviewNote,
      } : prx
    ));
    setSelectedPrescription(null);
    setReviewNote('');
  };

  const pendingCount = prescriptions.filter(p => p.status === 'Pending').length;
  const approvedCount = prescriptions.filter(p => p.status === 'Approved').length;
  const rejectedCount = prescriptions.filter(p => p.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl mb-1">Prescription Review</h2>
        <p className="text-gray-600">Review and approve customer prescriptions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl mt-1">{pendingCount}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-3xl mt-1">{approvedCount}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-3xl mt-1">{rejectedCount}</p>
              </div>
              <X className="w-10 h-10 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {prescription.id}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Submitted: {prescription.submittedDate}
                  </p>
                </div>
                <Badge className={getStatusColor(prescription.status)}>
                  {prescription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-600">Patient</p>
                    <p className="font-medium">{prescription.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-gray-600">Valid Until</p>
                    <p className="font-medium">{prescription.validUntil}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Prescribing Doctor</p>
                <p className="font-medium">{prescription.doctorName}</p>
                <p className="text-sm text-gray-600">License: {prescription.doctorLicense}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Prescribed Medications</p>
                <div className="space-y-2">
                  {prescription.medicines.map((med, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {med.quantity}</p>
                      <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                    </div>
                  ))}
                </div>
              </div>

              {prescription.status === 'Approved' && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-900">
                    <CheckCircle2 className="w-4 h-4 inline mr-1" />
                    Approved by {prescription.approvedBy} on {prescription.approvedDate}
                  </p>
                </div>
              )}

              {prescription.status === 'Rejected' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-900 mb-1">
                    <X className="w-4 h-4 inline mr-1" />
                    Rejected by {prescription.rejectedBy} on {prescription.rejectedDate}
                  </p>
                  <p className="text-sm text-red-800">Reason: {prescription.rejectionReason}</p>
                </div>
              )}

              {prescription.status === 'Pending' && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedPrescription(prescription)}
                >
                  Review Prescription
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Review Prescription - {selectedPrescription.id}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Patient: {selectedPrescription.customer}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPrescription(null);
                    setReviewNote('');
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Prescription Image Placeholder */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Prescription Image</p>
                <div className="border rounded-lg p-8 bg-gray-50 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{selectedPrescription.prescriptionImage}</p>
                  <Button variant="link" className="mt-2">View Full Size</Button>
                </div>
              </div>

              {/* Doctor Information */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Doctor Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">Name:</span> {selectedPrescription.doctorName}</p>
                  <p><span className="text-gray-600">License:</span> {selectedPrescription.doctorLicense}</p>
                  <p><span className="text-gray-600">Valid Until:</span> {selectedPrescription.validUntil}</p>
                </div>
              </div>

              {/* Medications */}
              <div>
                <h4 className="font-medium mb-2">Prescribed Medications</h4>
                <div className="space-y-2">
                  {selectedPrescription.medicines.map((med: any, idx: number) => (
                    <div key={idx} className="p-3 border rounded-lg bg-blue-50">
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {med.quantity}</p>
                      <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Review Notes (Required for rejection)</label>
                <Textarea
                  placeholder="Add notes about this prescription review..."
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleApprove(selectedPrescription.id)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve Prescription
                </Button>
                <Button 
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleReject(selectedPrescription.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject Prescription
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

const API_BASE =
  process.env.REACT_APP_API_BASE || 'http://localhost:8080';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || 'Request failed';
    throw new Error(message);
  }
  return response.json();
};

const normalizePensioner = (item) => ({
  id: item.id,
  name: item.fullName,
  uid: item.aadhaarNumber,
  schemes: [item.pensionScheme],
  state: item.state,
  status: item.status || (item.active ? 'APPROVED' : 'PENDING'),
  active: item.active,
  startDate: item.startDate,
  yearsReceiving: item.yearsReceiving,
  monthsReceiving: item.monthsReceiving,
  pensionAmount: item.pensionAmount,
  totalPensionReceived: item.totalPensionReceived,
  bankName: item.bankName,
  accountNumber: item.accountNumber,
  lastVerificationDate: item.lastVerificationDate,
  mobileNumber: item.mobileNumber,
});

export const fetchPensioners = async () => {
  const data = await handleResponse(
    await fetch(`${API_BASE}/api/pensioners`)
  );
  return data.map(normalizePensioner);
};

export const updatePensionerStatus = async (id, status) => {
  const response = await fetch(`${API_BASE}/api/pensioners/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
};

export const fetchDuplicateGroups = async () => {
  const data = await handleResponse(
    await fetch(`${API_BASE}/api/pensioners/duplicates`)
  );
  return data.map((item, index) => ({
    id: index + 1,
    name: item.fullName,
    uid: item.aadhaarNumber,
    schemes: item.schemes,
    state: item.state,
    count: item.count,
    records: item.records || [],
  }));
};

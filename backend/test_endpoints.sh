#!/bin/bash

BASE_URL="http://localhost:8080"

echo "1. Registering a Student..."
curl -X POST $BASE_URL/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "rollNumber": "CS101",
    "department": "CSE",
    "year": "3",
    "roomNumber": "101",
    "hostelBlock": "A"
  }'
echo -e "\n"

echo "2. Marking Attendance..."
curl -X POST $BASE_URL/attendance/mark \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "status": "PRESENT"
  }'
echo -e "\n"

echo "3. Applying for Leave..."
curl -X POST $BASE_URL/leave/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "fromDate": "2026-02-13",
    "toDate": "2026-02-15",
    "reason": "Going home"
  }'
echo -e "\n"

echo "4. Applying for OD..."
curl -X POST $BASE_URL/od/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "odDate": "2026-02-20",
    "purpose": "Tech Symposium"
  }'
echo -e "\n"

echo "5. Applying for Outing..."
curl -X POST $BASE_URL/outing/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "date": "2026-02-13",
    "outTime": "17:00:00",
    "returnTime": "19:00:00",
    "purpose": "Buying essentials"
  }'
echo -e "\n"

echo "6. Checking Student History..."
curl -X GET $BASE_URL/student/1/history
echo -e "\n"

echo "7. Warden: View Pending Requests..."
curl -X GET $BASE_URL/warden/pending-requests
echo -e "\n"

echo "8. Warden: Approve Leave Request (Assuming ID 1)..."
curl -X PUT $BASE_URL/warden/leave/1/approve
echo -e "\n"

echo "9. Warden: Approve OD Request (Assuming ID 1)..."
curl -X PUT $BASE_URL/warden/od/1/approve
echo -e "\n"

echo "10. Warden: Approve Outing Request (Assuming ID 1)..."
curl -X PUT $BASE_URL/warden/outing/1/approve
echo -e "\n"

echo "11. Warden: View Attendance Report..."
curl -X GET "$BASE_URL/warden/attendance-report"
echo -e "\n"

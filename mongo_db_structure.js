let DB = {
  Users:
  {
    "_id": ObjectId(),
    "name": "John Doe",
    "email": "john.doe@example.com",
    // "university_id": ObjectId("university_id"),
    "department": "CSE",
    "created_at": ISODate("2023-09-15T10:00:00Z")
  },

  // Universities:
  // {
  //   "_id": ObjectId(),
  //   "name": "Example University"
  // },

  // Courses:
  // {
  //   "_id": ObjectId(),
  //   "university_id": ObjectId("university_id"),
  //   "name": "Computer Science",
  //   "degree_type": "Bachelors"
  // },

  // Subjects:
  // {
  //   "_id": ObjectId(),
  //   "course_id": ObjectId("course_id"),
  //   "semester": 3,
  //   "name": "Data Structures"
  // },

  PYQs:
  {
    "_id": ObjectId(),
    "subject_id": ObjectId("subject_id"),
    "year": 2022,
    "file_url": "https://example.com/pyq.pdf",
    "uploaded_at": ISODate("2023-01-15T12:00:00Z"),
    "likes": [
      { "user_id": ObjectId("user_id") }
    ],
    "feedback": [
      {
        "user_id": ObjectId("user_id"),
        "rating": 4,
        "comment": "Helpful paper!",
        "feedback_at": ISODate("2023-02-01T14:30:00Z")
      }
    ]
  },

  LostandFound:
  {
    "_id": ObjectId(),
    "user_id": ObjectId("user_id"),
    "university_id": ObjectId("university_id"),
    "item_name": "Laptop",
    "description": "Black Dell laptop with a sticker",
    "location": "Library",
    "status": "Lost",
    "contact_info": "john.doe@example.com",
    "posted_at": ISODate("2023-09-01T08:30:00Z"),
    "comments": [
      {
        "user_id": ObjectId("user_id"),
        "comment_text": "I saw a similar laptop in the cafeteria.",
        "commented_at": ISODate("2023-09-02T10:00:00Z")
      }
    ]
  },

  UserActivity:
  {
    "_id": ObjectId(),
    "user_id": ObjectId("user_id"),
    "pyq_id": ObjectId("pyq_id"),
    "action": "viewed",
    "timestamp": ISODate("2023-03-10T15:45:00Z")
  }
}
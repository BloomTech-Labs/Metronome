define({ "api": [
  {
    "type": "post",
    "url": "/api/student/claimAssignmentToken",
    "title": "Claim assignment token",
    "name": "ClaimAssignmentToken",
    "group": "Student",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "assignmentToken",
            "description": "<p>a token containing the user's email and the assignment ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A simple success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Assignment claimed successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/studentController.js",
    "groupTitle": "Student",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidInput",
            "description": "<p>Describes the input error (invalid email format, invalid password length, etc.). &quot;errors&quot; will always be an array, even if there is only one error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidInput-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": [\"Password must be between 8 and 56 characters.\", \"First Name is a required field.\"]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/student/assignment",
    "title": "Get logged in student's assignments",
    "name": "GetAssignments",
    "group": "Student",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "assignments",
            "description": "<p>An array of the assignments linked to the student.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"assignments\": [{\n    \"_id\": \"5af352f0c9b6ae011ddbb065\",\n    \"days\": [\"Monday\", \"Wednesday\", \"Friday\"],\n    \"name\": \"My Assignment\",\n    \"dueDate\": \"2018-05-16 10:59:36.808\",\n    \"hours\": 5,\n    \"musicSheetAddr\": \"http://example.com/my_sheet.pdf\",\n  }, {\n    \"_id\": \"5af30e2aff9e28011850d7c4\",\n    \"days\": [\"Monday\"],\n    \"name\": \"My Other Assignment\",\n    \"dueDate\": \"2018-05-16 10:59:36.808\",\n    \"hours\": 1,\n    \"musicSheetAddr\": \"http://example.com/my_sheet.png\"\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/studentController.js",
    "groupTitle": "Student",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidInput",
            "description": "<p>Describes the input error (invalid email format, invalid password length, etc.). &quot;errors&quot; will always be an array, even if there is only one error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidInput-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": [\"Password must be between 8 and 56 characters.\", \"First Name is a required field.\"]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/teacher/emailAssignments",
    "title": "Email assignments",
    "name": "EmailAssignments",
    "group": "Teacher",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": false,
            "field": "emails",
            "description": "<p>An array of emails to send the assignment to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the assignment.</p>"
          },
          {
            "group": "Parameter",
            "type": "[String]",
            "optional": false,
            "field": "days",
            "description": "<p>The assigned days.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "hours",
            "description": "<p>The number of hours to work on the assignment.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dueDate",
            "description": "<p>The date that the assignment is due.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "musicSheetAddr",
            "description": "<p>The URL to the uploaded music sheet file.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>A simple success message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"Emails sent successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "InvalidEmails-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Could not send emails. Please verify that all email addresses are valid.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/teacherController.js",
    "groupTitle": "Teacher"
  },
  {
    "type": "get",
    "url": "/api/teacher/assignment",
    "title": "Get logged in teacher's assignments",
    "name": "GetAssignments",
    "group": "Teacher",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "assignments",
            "description": "<p>An array of the assignments linked to the teacher.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"assignments\": [{\n    \"_id\": \"5af352f0c9b6ae011ddbb065\",\n    \"days\": [\"Monday\", \"Wednesday\", \"Friday\"],\n    \"name\": \"My Assignment\",\n    \"dueDate\": \"2018-05-16 10:59:36.808\",\n    \"hours\": 5,\n    \"musicSheetAddr\": \"http://example.com/my_sheet.pdf\",\n    \"students\": [{\n      \"email\": \"test@example.com\",\n      \"firstName\": \"John\",\n      \"lastName\": \"Doe\"\n     }]\n  }, {\n    \"_id\": \"5af30e2aff9e28011850d7c4\",\n    \"days\": [\"Monday\"],\n    \"name\": \"My Other Assignment\",\n    \"dueDate\": \"2018-05-16 10:59:36.808\",\n    \"hours\": 1,\n    \"musicSheetAddr\": \"http://example.com/my_sheet.png\",\n    \"students\": [{\n      \"email\": \"test@example.com\",\n      \"firstName\": \"John\",\n      \"lastName\": \"Doe\"\n     }]\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/teacherController.js",
    "groupTitle": "Teacher",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidInput",
            "description": "<p>Describes the input error (invalid email format, invalid password length, etc.). &quot;errors&quot; will always be an array, even if there is only one error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "InvalidInput-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": [\"Password must be between 8 and 56 characters.\", \"First Name is a required field.\"]\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "Log a user in",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The user's JWT.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"abcdef.ghijklmnop.qrstuvwxyz\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/userController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesNotExist",
            "description": "<p>&quot;User does not exist with that email.&quot;</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IncorrectPassword",
            "description": "<p>&quot;Password is not correct.&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserDoesNotExist-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"User does not exist with that email.\"\n}",
          "type": "json"
        },
        {
          "title": "IncorrectPassword-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Password is not correct.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/register",
    "title": "Register a new user",
    "name": "RegisterUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The user's first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The user's last name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>The user's role (Teacher or Student) (defaults to Student if not specified).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The new user's JWT.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"abcdef.ghijklmnop.qrstuvwxyz\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/userController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExists",
            "description": "<p>&quot;User already exists with that email.&quot;</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidInput",
            "description": "<p>Describes the input error (invalid email format, invalid password length, etc.).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserAlreadyExists-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"User already exists with that email.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidInput-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": \"Password must be between 8 and 56 characters.\", \"First Name is a required field.\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/user/transaction",
    "title": "make a stripe transaction",
    "name": "StripeTransaction",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The user's id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tokenId",
            "description": "<p>The stripe front-end transaction token id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subscribeType",
            "description": "<p>The user subscription type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>The user transaction price.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "transaction",
            "description": "<p>The user's transaction JSON information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"ch_1CNoOCBAjX4w9BqH3Ck3KBAL\",\n  \"object\": \"charge\",\n  \"amount\": 299,\n  \"amount_refunded\": 0,\n  \"application\": null,\n  \"application_fee\": null,\n  \"balance_transaction\": \"txn_1CNoOCBAjX4w9BqHZaGDqBbr\",\n  \"captured\": true,\n  \"created\": 1525380656,\n  \"currency\": \"usd\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserDoesNotExist",
            "description": "<p>&quot;User not exist.&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Transaction Error:",
          "content": "HTTP/1.1 500 Bad Request\n{\n  \"error\": \"Transaction Error\"\n}",
          "type": "json"
        },
        {
          "title": "\"No Transaction\"",
          "content": "HTTP/1.1 500 Bad Request\n{\n  \"error\": \"No Transaction\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/user/",
    "title": "Edit the user's profile",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newEmail",
            "description": "<p>The user's new email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>The user's old (current) password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>The user's new password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The user's new first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The user's new last name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The user's new JWT.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"abcdef.ghijklmnop.qrstuvwxyz\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/userController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserAlreadyExists",
            "description": "<p>&quot;User already exists with that email.&quot;</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidInput",
            "description": "<p>Describes the input error (invalid email format, invalid password length, etc.).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserAlreadyExists-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"User already exists with that email.\"\n}",
          "type": "json"
        },
        {
          "title": "InvalidInput-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": \"Password must be between 8 and 56 characters.\", \"First Name is a required field.\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });

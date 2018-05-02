define({ "api": [
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
    },
    "version": "0.0.0",
    "filename": "server/controllers/authController.js",
    "groupTitle": "User"
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
            "description": "<p>Describes the input error (invalid email format, invalid password length, etc.)</p>"
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
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Password must be between 8 and 56 characters.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/controllers/authController.js",
    "groupTitle": "User"
  }
] });

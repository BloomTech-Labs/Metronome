exports.UserDataFactory = class UserDataFactory {
  static get validNewUser() {
    return {
      email: 'test@example.com',
      password: 'testuserpassword',
      firstName: 'John',
      lastName: 'Doe',
    };
  }

  static get validNewUser2() {
    return {
      email: 'me@example.com',
      password: 'differentpassword',
      firstName: 'Adam',
      lastName: 'Jensen',
    };
  }

  static get newUserWithBadEmail() {
    return { ...this.validNewUser, email: 'bademail' };
  }

  static get newUserWithBadPassword() {
    return { ...this.validNewUser, password: 'abc' };
  }

  static get newUserWithBadFirstName() {
    return { ...this.validNewUser, firstName: '' };
  }

  static get newUserWithBadLastName() {
    return { ...this.validNewUser, lastName: '' };
  }
};

exports.AssignmentDataFactory = class AssignmentDataFactory {
  static get validNewAssignment() {
    return {
      name: 'everyday practice',
      days: { monday: false, wednesday: false, friday: false },
      hours: 1,
      dueDate: new Date(),
      musicSheetAddr: 'localhost:8000',
      emails: ['test@example.com'],
    };
  }

  static get newAssignmentWithBadName() {
    return { ...this.validNewAssignment, name: null };
  }

  static get newAssignmentWithBadDays() {
    return { ...this.validNewAssignment, days: null };
  }

  static get newAssignmentWithBadHours() {
    return { ...this.validNewAssignment, hours: null };
  }

  static get newAssignmentWithBadDueDate() {
    return { ...this.validNewAssignment, dueDate: null };
  }

  static get newAssignmentWithBadAddress() {
    return { ...this.validNewAssignment, musicSheetAddr: null };
  }

  static get newAssignmentWithBadEmails() {
    return { ...this.validNewAssignment, emails: null };
  }
};

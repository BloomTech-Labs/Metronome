exports.UserDataFactory = class UserDataFactory {
  static get validNewUser() {
    return {
      email: 'test@example.com',
      password: 'testuserpassword',
      firstName: 'John',
      lastName: 'Doe',
    };
  }

  static get newUserWithBadEmail() {
    return { ...this.validUser, email: 'bademail' };
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
      days: ['monday', 'wednesday', 'friday'],
      hours: 1,
      musicSheetAddr: 'localhost:8000',
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

  static get newAssignmentWithBadAddress() {
    return { ...this.validNewAssignment, musicSheetAddr: null };
  }
};

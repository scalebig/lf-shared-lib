module.exports = {
  en: {
    globals: {
      cancel: 'cancel',
      email: 'email',
      login: 'login',
      dateTime: {
        sunday: 'Sunday',
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday'
      },
      validationMsgs: {
        required: 'This field is required',
        passwordsMustMatch: 'The password fields must match',
        passwordMinLength: 'Passwords must be at 8 characters long',
        notValidEmail: 'This not a valid email address'
      },
      fieldPlaceHolders: {
        email: 'Your university email address',
        password: 'Password',
        confirmPassword: 'Confirm password',
        firstName: 'First name',
        lastName: 'Last name',
        city: 'City',
        country: 'Country',
        timezone: 'Time zone',
        idNumber: 'ID number'
      }
    },
    networkErrorMsgs: {
      serverErrorMsg: 'There was a server error. If this problem persists, please contact support.',
      fetchErrorMsg: 'There was a problem connecting to LabFlow servers. Please verify your internet connection.'
    },
    sessionManagement: {
      'inactiveWarning': 'Your session has been inactive for <%= mins %> minutes. You will be logged out in ',
      'inactiveLogout': 'You were logged out after <%= mins %> minutes of inactivity.'
    },
    login: {
      form: {
        forgotPassword: 'Forgot password?',
        help: {
          email: 'Your university email address',
          password: 'Your password.'
        },
        signup: {
          label1: 'Is this your first time here?',
          label2: 'For full access to the site, you first need an account',
          button: 'Create Account'
        }
      },
      incorrectLoginMsg: 'Your email and/or password do not match, please try again.',
      notConfirmedMsg: 'is not confirmed. An email was sent to the email address provided with directions to confirm your account.'
    },
    password: {
      reset: {
        request: {
          title: 'Reset password',
          label: 'To reset your password, enter your email below. If we find a matching email, a reset link will be sent to that email address.',
          resetButton: 'reset',
          fieldHelp: 'Your email address',
          emailSent: 'Your password reset request has been sent.'
        },
        change: {
          title: 'Reset password',
          label: 'Enter your new password and confirm it. You will be logged in after your password is saved.',
          checkingToken: 'Validating reset request URL.',
          tokenInvalid: 'This reset request URL is invalid.',
          currentPassword: 'Current password',
          newPassword: 'New password',
          confirmPassword: 'Confirm password',
          changeButton: 'save',
          requestAgain: 'request another reset',
          validationMsgs: {
            required: 'This field is required',
            passwordsMustMatch: 'The password fields must match',
            passwordMinLength: 'Passwords must be at least 8 characters long',
            samePassword: 'New password is the same as the old password'
          }
        }
      }
    },
    account: {
      create: {
        form: {
          createAccount: 'Create account',
          fieldsRequired: ' indicates required fields',
          help: {
            email: 'Your university email address',
            password: 'Password',
            confirmPassword: 'Confirm password',
            firstName: 'First name',
            lastName: 'Last name',
            city: 'City',
            country: 'Country',
            timezone: 'Time zone',
            idNumber: 'ID number'
          },
          validationMsgs: {
            required: 'This field is required',
            passwordsMustMatch: 'The password fields must match',
            passwordMinLength: 'Passwords must be at 8 characters long'
          }
        },
        incorrectLoginMsg: 'Your username and/or password do not match, please try again'
      }
    },
    sectionManagement: {
      navBarTitle: 'Section Management',
      header: {
        sectionsCount: {
          viewing: 'Viewing',
          of: 'of',
          sections: 'sections'
        },
        viewSelector: {
          management: 'People',
          insights: 'Insights'
        },
        tabs: {
          sections: 'Sections',
          times: 'Times',
          rooms: 'Rooms',
          tas: 'TAs',
          upload: 'Upload'
        }
      },
      main: {
        heading: 'Section Management',
        emptyContent: {
          line1: 'You have no sections defined',
          line2: 'Click on the Add Section button to add a section.',
          noMatching: 'No matching sections to display'
        },
        tile: {
          room: 'Room',
          open: 'Open',
          students: 'students'
        }
      },
      sidebar: {
        filterRooms: 'Rooms',
        emptyRooms: 'Add rooms to filter on rooms',
        filterDays: 'Days',
        emptyDays: 'Add times to filter on days and times',
        filterTime: 'Time',
        filterTas: 'TAs',
        filterStudents: 'Number of students',
        sortLabel: 'Sort by',
        sortOptions: {
          sectionName: 'Section name',
          studentsLowHigh: 'Students: low to high',
          studentsHighLow: 'Students: high to low',
          metric1LowHigh: 'Metric 1: low to high',
          metric1HighLow: 'Metric 1: high to low',
          metric2LowHigh: 'Metric 2: low to high',
          metric2HighLow: 'Metric 2: high to low',
          metric3LowHigh: 'Metric 3: low to high',
          metric3HighLow: 'Metric 3: high to low'
        }
      }
    },
    sectionDetail: {
      heading: 'Section ',
      sectionDef: 'Section definition',
      additionalInfo: 'Additional information',
      closeBtn: 'Close section view',
      snackbar: {
        saved: 'Saved successfully',
        deleted: 'Section deleted successfully'
      },
      form: {
        nameInput: 'Section name or #',
        nameHelper: '* Required. Using section number is the most common',
        timeInput: 'Meeting Time',
        timeHelper: 'Select the day and time the section meets',
        roomInput: 'Room',
        taInput: 'TA',
        taHelper: 'Enter TA name, choices will appear',
        maxMembersInput: 'Maximum Students',
        enrollInput: 'Enrollment key',
        enrollHelper: 'Students use this code to enroll into specific section',
        saveBtn: 'Save',
        deleteBtn: 'Delete Section',
        deleteDialog: {
          delete: 'Delete',
          dialogText: 'Are you sure you want to delete this section?',
          cancel: 'Cancel'
        }
      },
      studentsList: {
        students: 'Students',
        addStudent: 'Add a student',
        helperText: 'Enter student name, choices will appear'
      },
      metricsList: {
        overview: 'Metrics Overview',
        sectionAvg: 'Section average:',
        classAvg: 'Class average:',
        rank: 'Rank:'
      }
    },
    welcomePage: {
      heading: 'Welcome to section management',
      line1: 'You currently have zero sections defined',
      line2: 'You have the following options:',
      line3: 'You can upload a spreadsheet with all of the section information for your course',
      btnUpload: 'Upload sections',
      line4: 'You can manually enter time, room, and TA information for your course on the following screens',
      btnManual: 'Manually enter section data',
      line5: 'You can skip the details for now, and create an empty section',
      btnSkip: 'Skip to create empty section'
    },
    uploadPage: {
      heading: 'Upload your sections',
      line1: 'Sections are defined by a name, meeting day, start time (24 hour), end time (24 hour), room, TA (email address), and enrollment code. Upload a .csv file with a header row, and a row for each section. Use the example file as a template.',
      btnExample: 'Example File',
      btnBack: 'Back'
    },
    timesPage: {
      heading: 'When do your sections meet?',
      line1: 'Enter the days of the week and times your lab sections meet. Once you enter this information, you will be able to use it when you create sections.',
      btnSectionsHome: 'Sections Home',
      btnNextRooms: 'Next - Rooms'
    },
    roomsPage: {
      heading: 'Where do your sections meet?',
      line1: 'Enter the room numbers where your labs meet. Once you enter this information, you will be able to use it when you create sections.',
      btnSectionsHome: 'Sections Home',
      btnNextTas: 'Next - TAs',
      btnNewSection: 'Define new section'
    },
    tasPage: {
      heading: 'Who are your TAs?',
      line1: 'Use email addresses to add TAs to your course',
      btnSectionsHome: 'Sections Home',
      btnNewSection: 'Define new section'
    },
    newSectionPage: {
      heading: 'Define your sections',
      line1: 'Give your section a name, select a meeting time, room, TA, and add an enrollment key',
      btnSectionsHome: 'Sections Home'
    },
    quiz: {
      questions: {
        textPlaceholder: 'Type Answer'
      },
      tabs: {
        attempts: 'Attempts',
        question: 'Question',
        submit: 'Review',
        settings: 'settings',
        edit: 'edit',
        groupOverrides: 'group overrides',
        userOverrides: 'user overrides',
        results: 'results',
        import: 'import'
      },
      attempts: {
        availableAttemptsLabel: 'Available attempts',
        timedQuizLabel: 'Time limit',
        timedQuizMsg: 'This is a timed quiz. Once you begin the quiz you will only have the specified time to complete this quiz.',
        timedQuizWarning: 'Time will count down when you start your attempt. If you do not submit before time expires, your attempt will be autosubmitted.',
        finished: 'Completed',
        inprogress: 'In Progress',
        correct: 'Correct',
        scaledGrade: 'Scaled Grade',
        review: 'Review',
        continue: 'Continue',
        noAttempts: 'No attempts made yet.',
        startAttempt: 'Attempt Quiz',
        startAttemptAgain: 'Attempt Quiz Again',
        continueAttempt: 'Continue Current Attempt',
        quizCloseMessage: 'Closes on ',
        quizClosedMessage: 'Closed on ',
        quizOpenMessage: 'Opens on ',
        quizOpenedMessage: 'Opened on ',
        submitAll: 'Submit All'
      }
    },
    userEvents: {
      usernamePlaceHolder: 'Search by username',
      searchButtonLabel: 'Search'
    },
    payment: require('./local-definitions/payment'),
    report: {
      status: {
        0: 'Not started',
        1: 'Draft, not submitted',
        2: 'Submitted, needs grading',
        3: 'Grading in-progress',
        4: 'Grading complete',
        5: 'Grade posted'
      }
    },
    sso: {
      finishLogin: 'Finishing the login process...',
      error: 'We were unable to complete your Labflow login process.'
    },
    completeSetup: {
      title: 'Complete Account Setup'
    },
    courseSetup: {
      duplicateKeyError: {
        title: 'An Error Occurred.',
        details: 'Your last change has not been saved. Please reload to continue and try again. If the error persists, please contact support.',
        primaryCaption: 'Reload'
      },
      deleteActivity: {
        title: 'Confirm Deletion',
        details: 'Are you sure you want to delete',
        primaryCaption: 'Confirm',
        secondaryCaption: 'Cancel'
      },
      import: {
        searchTitle: 'Select Course',
        selectTitle: 'Import Activities From',
        primaryCaptionPre: 'Import',
        primaryCaptionPost: 'Activities',
        secondaryCaption: 'Cancel'
      }
    }
  },
  fr: {
    globals: {
      email: 'email',
      login: 's\'identifier'
    },
    login: {
      form: {
        forgotPassword: 'mot de passe oublié?',
        help: {
          email: 'Votre adresse email de l\'université d\'email.',
          password: 'Votre mot de passe.'
        },
        signup: {
          label1: 'Est-ce ta première fois ici?',
          label2: 'Pour un accès complet au site, vous devez d\'abord avoir un compte.',
          button: 'Créer un compte'
        }
      }
    },
    courseSetup: {
      duplicateKeyError: {
        title: "Une erreur s'est produite.",
        details: "Votre dernière modification n'a pas été enregistrée. Veuillez recharger pour continuer et réessayer. Si l'erreur persiste, veuillez contacter le support.",
        primaryCaption: 'Recharger'
      },
      deleteActivity: {
        title: 'Confirmer la Suppression',
        details: 'Voulez-vous vraiment supprimer',
        primaryCaption: 'Confirmer',
        secondaryCaption: 'Annuler'
      },
      import: {
        searchTitle: 'Sélectionnez le cours',
        selectTitle: 'Importer des activités depuis',
        primaryCaptionPre: 'Importer',
        primaryCaptionPost: 'Activités',
        secondaryCaption: 'Annuler'
      }
    }
  }
}

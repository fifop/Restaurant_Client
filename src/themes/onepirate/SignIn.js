import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';

function SignIn() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
       <Box 
        sx={{ 
          backgroundColor: '#f0eddf', // Background color for the frame
          borderRadius: '8px', // Rounded corners for the frame
          padding: '20px', // Padding around AppForm
          // Additional styles if needed
        }}
      >
      <AppAppBar  />
      </Box>
      <Box 
        sx={{ 
          backgroundColor: '#f0eddf', // Background color for the frame
          borderRadius: '8px', // Rounded corners for the frame
          padding: '20px', // Padding around AppForm
          // Additional styles if needed
        }}
      >
      <AppForm >
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign In
        </Typography>
        <Typography variant="body2" align="center">
          {'Not a member yet? '}
          <Link
            href="/premium-themes/onepirate/sign-up/"
            align="center"
            underline="always"
            sx={{
              color: "#319aa0",
              "&:hover": {
                color: "darkcyan",
              },
            }}
          >
            Sign Up here
          </Link>
        </Typography>
        <Form 
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  backgroundColor: "#319aa0", 
                  "&:hover": { backgroundColor: "darkcyan" },
                  borderRadius: '35%',
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'cursive',
                }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link 
            underline="always" 
            href="/premium-themes/onepirate/forgot-password/"
            sx={{ 
              color: "#319aa0",
              "&:hover": { color: "darkcyan" },
            }}
          >
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      </Box>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);

import { Box, Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invaild email address")
    .required("email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("password is required"),
});

export default function Signin() {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log("values: ", values);
  };

  const handleNavigate = () => navigate("/signup");

  return (
    <div>
      <div>
        <Box
          p={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width={"100%"}
        >
          <img src="https://i.imgur.com/zqpwkLQ.png" alt="" />
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {/* Email Field */}
                <Box mb={4} mt={4}>
                  <Field name="email">
                    {({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Email"
                          isInvalid={errors.email && touched.email}
                          className="border"
                          size={"lg"}
                          width={"300px"}
                        />
                        {errors.email && touched.email && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.email}
                          </Text>
                        )}
                      </>
                    )}
                  </Field>
                </Box>

                {/* Password Field */}
                <Box mb={4}>
                  <Field name="password">
                    {({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Password"
                          isInvalid={errors.password && touched.password}
                          className="border"
                        />
                        {errors.password && touched.password && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.password}
                          </Text>
                        )}
                      </>
                    )}
                  </Field>
                </Box>

                {/* Submit Button */}
                <Box mt={4}>
                  <Button
                    type="submit"
                    colorScheme={"blue"}
                    width={"100%"}
                    className="border"
                  >
                    Sign In
                  </Button>
                </Box>

                {/* Divider */}
                <Box mt={6} display="flex" alignItems="center">
                  <Box flex="1" height="1px" bg="gray.300" />
                  <Text
                    as="span"
                    mx={4}
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.500"
                  >
                    또는
                  </Text>
                  <Box flex="1" height="1px" bg="gray.300" />
                </Box>

                {/* sign up Button */}
                <Box mt={4}>
                  <Button
                    colorScheme={"blue"}
                    width={"100%"}
                    className="border"
                    onClick={handleNavigate}
                  >
                    Sign Up
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
}

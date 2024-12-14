import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invaild email address")
    .required("email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("password is required"),
});

export default function Signin() {
  const [serverError, setServerError] = useState("");
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError(""); // 서버 에러 초기화
    try {
      // 서버로 로그인 요청
      const response = await login(values);
      console.log("Login successful:", response);

      // 로그인 성공 시 대시보드로 이동
      navigate("/"); // 홈으로 이동
    } catch (error) {
      // 서버 에러 처리
      setServerError(
        error.response?.data?.message || "An unexpected error occurred"
      );
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false); // 폼 제출 상태 리셋
    }
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
            {({ handleSubmit, errors, touched, isSubmitting }) => (
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

                {/* Server Error Message */}
                {serverError && (
                  <Box mb={4}>
                    <Text color="red.500" fontSize="sm">
                      {serverError}
                    </Text>
                  </Box>
                )}

                {/* Submit Button */}
                <Box mt={4}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="100%"
                    size="lg"
                    isLoading={isSubmitting} // 제출 중 로딩 상태
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
                    isDisabled={isSubmitting} // 제출 중 클릭 방지
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

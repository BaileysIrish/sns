import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../../api/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  telNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Must be a valid phone number")
    .required("Phone number is required"),
  nickname: Yup.string()
    .min(2, "Nickname must be at least 2 characters")
    .max(20, "Nickname must be less than 20 characters")
    .required("Nickname is required"),
  profileImage: Yup.mixed().nullable(),
});

export default function Signup() {
  const [serverError, setServerError] = useState(""); // 서버 에러 상태 관리
  const [successMessage, setSuccessMessage] = useState(""); // 성공 메시지 관리
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setServerError(""); // 에러 상태 초기화
    setSuccessMessage(""); // 성공 메시지 초기화

    try {
      // FormData로 변환 (파일 업로드 포함)
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("nickname", values.nickname);
      formData.append("telNumber", values.telNumber);

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      console.log(...formData); // FormData 확인
      // 회원가입 요청
      const response = await signup(formData);
      console.log("Signup successful:", response);

      // 성공 메시지 설정
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
      }, 2000);
    } catch (error) {
      // 서버 에러 처리
      setServerError(
        error.response?.data?.message || "An unexpected error occurred"
      );
      console.error("Signup failed:", error);
    } finally {
      setSubmitting(false); // 제출 상태 리셋
    }
  };

  const handleNavigate = () => navigate("/login");
  return (
    <div>
      <div>
        <Box
          p={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width={"100%"}
          maxWidth="450px" // 컨테이너 너비 제한
          mx="auto" // 가운데 정렬
        >
          <img src="https://i.imgur.com/zqpwkLQ.png" alt="" />
          <Formik
            initialValues={{
              email: "",
              password: "",
              telNumber: "",
              nickname: "",
              profileImage: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              isSubmitting,
              values,
            }) => (
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

                {/* Phone Number Field */}
                <Box mb={4}>
                  <Field name="telNumber">
                    {({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="telNumber"
                          placeholder="Phone Number"
                          isInvalid={errors.telNumber && touched.telNumber}
                          size="lg"
                          className="border"
                        />
                        {errors.telNumber && touched.telNumber && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.telNumber}
                          </Text>
                        )}
                      </>
                    )}
                  </Field>
                </Box>

                {/* nickname Field */}
                <Box mb={4}>
                  <Field name="nickname">
                    {({ field }) => (
                      <>
                        <Input
                          {...field}
                          id="nickname"
                          placeholder="Nickname"
                          isInvalid={errors.nickname && touched.nickname}
                          size="lg"
                          className="border"
                        />
                        {errors.nickname && touched.nickname && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.nickname}
                          </Text>
                        )}
                      </>
                    )}
                  </Field>
                </Box>

                {/* profile Field */}
                <Box mb={4}>
                  <Field name="profileImage">
                    {({ field }) => (
                      <>
                        <input
                          id="profileImage"
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue(
                              "profileImage",
                              event.currentTarget.files[0] || null
                            );
                          }}
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "16px",
                          }}
                        />
                        {values.profileImage && (
                          <Text mt={1} fontSize="sm" color="green.500">
                            {values.profileImage.name}
                          </Text>
                        )}
                        {errors.profileImage && touched.profileImage && (
                          <Text color="red.500" fontSize="sm" mt={1}>
                            {errors.profileImage}
                          </Text>
                        )}
                      </>
                    )}
                  </Field>
                </Box>

                {/* Server Error Message */}
                {serverError && (
                  <Box mb={4}>
                    <Text color="red.500" fontSize="sm" textAlign="center">
                      {serverError}
                    </Text>
                  </Box>
                )}

                {/* Success Message */}
                {successMessage && (
                  <Box mb={4}>
                    <Text color="green.500" fontSize="sm" textAlign="center">
                      {successMessage}
                    </Text>
                  </Box>
                )}

                {/* Sign up Button */}
                <Box mt={4}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="100%"
                    size="lg"
                    isLoading={isSubmitting} // 제출 중 버튼 로딩
                    isDisabled={isSubmitting} // 중복 제출 방지
                    className="border"
                  >
                    Sign Up
                  </Button>
                </Box>

                {/* Navigate to Login */}
                <Box mt={4}>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    width="100%"
                    size="lg"
                    className="border"
                    onClick={handleNavigate}
                  >
                    Go to Login
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

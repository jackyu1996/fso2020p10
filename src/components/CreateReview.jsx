import React from "react";
import { View } from "react-native";
import { useHistory } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("rating is required")
    .min(0, "rating must be bigger than 0")
    .max(100, "rating cannot be bigger than 100"),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ margin: theme.margins.standard }}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        testID="ownerName"
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        testID="repositoryName"
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        testID="rating"
      />
      <FormikTextInput
        name="text"
        placeholder="Review"
        multiline={true}
        testID="text"
      />
      <Text style={theme.primaryButton} onPress={onSubmit} testID="newReview">
        Create Review
      </Text>
    </View>
  );
};

const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        repositoryName: "",
        ownerName: "",
        rating: "",
        text: "",
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const { data } = await createReview({
        repositoryName,
        ownerName,
        rating: Number(rating),
        text,
      });
      history.push(`/repo/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

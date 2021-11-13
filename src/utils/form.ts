import * as R from "ramda";
import * as Yup from "yup";

export const conditionalField = (field: any, { value, is }: any) => {
  if (!field.validator) {
    return field;
  }

  const { validator, ...rest } = field;

  return {
    ...rest,
    validator: Yup.mixed().when([value], {
      is,
      then: validator,
    }),
  };
};

export const buildSchema = (formData: any) => {
  const iterateObject = (obj: any, schema: any) => {
    const { name, validator, ...rest } = obj;

    if (name && validator) {
      schema[name] = validator;
      delete obj.validator;
    }

    for (const key in rest) {
      if (rest.hasOwnProperty(key)) {
        if (R.is(Array, rest[key])) {
          for (const item of rest[key]) {
            iterateObject(item, schema);
          }
        } else if (R.is(Object, rest[key])) {
          iterateObject(rest[key], schema);
        }
      }
    }
  };

  const schema = {};
  iterateObject(formData, schema);

  return Yup.object().shape(schema);
};

export const buildInitialValues = (formData: any) => {
  const iterateObject = (obj: any, initialValues: any) => {
    const { name, initialValue, ...rest } = obj;
    if (name) {
      initialValues[name] = initialValue ?? undefined;
      delete obj.initialValue;
    }
    for (const key in rest) {
      if (rest.hasOwnProperty(key)) {
        if (R.is(Array, rest[key])) {
          for (const item of rest[key]) {
            iterateObject(item, initialValues);
          }
        } else if (R.is(Object, rest[key])) {
          iterateObject(rest[key], initialValues);
        }
      }
    }
  };
  const initialValues = {};
  iterateObject(formData, initialValues);

  return initialValues;
};
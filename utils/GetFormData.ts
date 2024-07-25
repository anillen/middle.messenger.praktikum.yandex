export default function GetFormData(element: EventTarget | null): object {
  if (!(element instanceof HTMLFormElement)) {
    throw new Error("Element is not form");
  }
  const formData = new FormData(element);
  const formDataObj = {};
  formData.forEach((value, key) => (formDataObj[key] = value));
  return formDataObj;
}

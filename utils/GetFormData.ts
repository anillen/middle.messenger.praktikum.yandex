interface DataObject {
  [key: string]: FormDataEntryValue;
}

export default function GetFormData<T>(element: EventTarget | null): T {
  if (!(element instanceof HTMLFormElement)) {
    throw new Error("Element is not form");
  }
  const formData = new FormData(element);
  const formDataObj: DataObject = {};
  formData.forEach((value, key) => (formDataObj[key] = value));
  return formDataObj as T;
}

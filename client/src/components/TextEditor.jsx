import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextEditor = ({ value, setValue }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      config={{
        placeholder: "Type or paste your content here...",
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setValue(data);
      }}
    />
  );
};

export default TextEditor;

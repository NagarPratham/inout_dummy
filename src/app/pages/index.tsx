import EditableTable from "../components/editableTable";
import FileUpload from "../components/fileUpload";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload & Edit Records</h1>
      <FileUpload />
      <EditableTable />
    </div>
  );
}

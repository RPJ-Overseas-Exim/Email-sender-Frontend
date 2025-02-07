import TemplateForm from "@/components/dashboard/templateEditor/TemplateForm";
import { Template } from "@/lib/types/TemplateEditor";
import TemplateCombobox from "@/components/dashboard/templateEditor/TemplateCombobox";
import GetRequest from "@/lib/requestHelpers/GetRequest";

export default async function TemplateEditor() {
  const res = await GetRequest("/templates");
  let templates: Template[] | [];
  let templateMap: { [name: string]: { [x: string]: string } } = {};
  if (res?.data) {
    templates = res.data.map(
      (template: { name: string; body: string; subject: string }) => {
        const [type, name] = template.name.split("-");
        templateMap[template.name] = {
          subject: template.subject,
          body: template.body,
        };
        return {
          ...template,
          name,
          fullName: `${name}-${type}`,
          type,
        };
      },
    );
    templates.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
  } else {
    templates = [];
  }
  return (
    <section id="templateEditor">
      <TemplateCombobox templates={templates} />
      <TemplateForm templates={templateMap} />
    </section>
  );
}

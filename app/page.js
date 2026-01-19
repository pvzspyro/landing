import { HOME_HTML } from "../data/homeMarkup";

export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />;
}

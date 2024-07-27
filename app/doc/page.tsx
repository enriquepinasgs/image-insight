import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function DocPage() {
  return (
    <main className="container mx-auto">
      <SwaggerUI url="spec.yaml" />
    </main>
  );
}

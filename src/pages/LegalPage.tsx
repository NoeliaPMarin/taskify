import { Link } from "react-router-dom";

export default function LegalPage({ kind }: { kind: "terms" | "privacy" }) {
  const privacy = kind === "privacy";
  return <main className="min-h-screen bg-secondaryBackground px-6 py-16">
    <article className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8 prose">
      <Link to="/" className="text-primary underline">← Taskify</Link>
      <h1 className="text-3xl my-6">{privacy ? "Privacy Policy" : "Terms of Service"}</h1>
      <p>Last updated: 13 October 2026</p>
      {privacy ? <>
        <h2 className="text-xl mt-6">Information we store</h2><p>Taskify stores your name, email address, encrypted password, tasks and messages you submit through the contact form.</p>
        <h2 className="text-xl mt-6">Purpose</h2><p>This information is used only to provide the task-management service and respond to enquiries.</p>
        <h2 className="text-xl mt-6">Demo hosting</h2><p>This is a portfolio project. Do not enter sensitive or confidential information.</p>
      </> : <>
        <h2 className="text-xl mt-6">Use of the service</h2><p>You may use Taskify for lawful personal task management. You are responsible for the information you enter.</p>
        <h2 className="text-xl mt-6">Availability</h2><p>The service is provided as a demonstration without guarantees of uptime or permanent data retention.</p>
        <h2 className="text-xl mt-6">Accounts</h2><p>You are responsible for keeping your password private and for activity performed through your account.</p>
      </>}
    </article>
  </main>;
}

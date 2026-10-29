import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
const emptyForm = { title: "", category: "WEB DEVELOPMENT", description: "", link: "", cover: "", published: true };

export function AdminPanel() {
  const [session, setSession] = useState(null);
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => { if (session) refresh(); }, [session]);

  async function refresh() {
    const [{ data: projectData, error: projectError }, { data: inquiryData, error: inquiryError }] = await Promise.all([
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
    ]);
    if (projectError || inquiryError) setMessage((projectError || inquiryError).message);
    setProjects(projectData || []); setInquiries(inquiryData || []);
  }

  async function login(event) {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({ email: data.get("email"), password: data.get("password") });
    setMessage(error?.message || "");
  }

  async function saveProject(event) {
    event.preventDefault();
    const payload = { title: form.title, category: form.category, description: form.description, link: form.link || null, cover_url: form.cover || null, published: form.published };
    const result = editing ? await supabase.from("projects").update(payload).eq("id", editing) : await supabase.from("projects").insert(payload);
    setMessage(result.error?.message || (editing ? "Project updated." : "Project added."));
    if (!result.error) { setForm(emptyForm); setEditing(null); refresh(); }
  }

  async function removeProject(id) {
    if (!window.confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    setMessage(error?.message || "Project deleted."); refresh();
  }

  async function upload(event) {
    const file = event.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) { setMessage("Use an image smaller than 5 MB."); return; }
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const { error } = await supabase.storage.from("portfolio-media").upload(path, file);
    if (error) { setMessage(error.message); return; }
    const { data } = supabase.storage.from("portfolio-media").getPublicUrl(path);
    setForm((current) => ({ ...current, cover: data.publicUrl })); setMessage("Image uploaded. Save the project to apply it.");
  }

  async function markRead(id, value) {
    const { error } = await supabase.from("inquiries").update({ is_read: value }).eq("id", id);
    if (error) setMessage(error.message); else refresh();
  }

  async function removeInquiry(id) {
    if (!window.confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("inquiries").delete().eq("id", id);
    setMessage(error?.message || "Inquiry deleted."); refresh();
  }

  if (!session) return <div className="admin-page"><a className="admin-back" href="/#home">← Back to portfolio</a><form className="admin-card" onSubmit={login}><span className="eyebrow-text">PRIVATE AREA</span><h1>Admin access.</h1><p>Sign in with your Supabase admin account.</p><label>Email<input name="email" type="email" required autoComplete="username" /></label><label>Password<input name="password" type="password" required autoComplete="current-password" /></label><button className="glass-button" type="submit">Sign in</button>{message && <p className="form-status error">{message}</p>}</form></div>;

  return <div className="admin-page"><div className="admin-top"><a className="admin-back" href="/#home">← View portfolio</a><button className="signout" onClick={() => supabase.auth.signOut()}>Sign out</button></div><div className="admin-dashboard"><div className="admin-heading"><span className="eyebrow-text">MOHAMMAD REHXNN / ADMIN</span><h1>Manage your work.</h1><p>{message || "Projects and inquiries are managed from this private dashboard."}</p></div><div className="admin-columns"><form className="admin-card project-editor" onSubmit={saveProject}><h2>{editing ? "Edit project" : "Add a project"}</h2><label>Project title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><label>Category<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option>WEB DEVELOPMENT</option><option>UI/UX DESIGN</option><option>GRAPHIC DESIGN</option><option>VIDEO EDITING</option><option>AI CREATIVITY</option></select></label><label>Description<textarea required rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label><label>Live URL<input type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} /></label><label>Cover image URL<input type="url" value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} /></label><label className="upload-label">Upload cover image<input type="file" accept="image/*" onChange={upload} /></label><label><span>Visibility</span><select value={form.published ? "published" : "draft"} onChange={(e) => setForm({ ...form, published: e.target.value === "published" })}><option value="published">Published</option><option value="draft">Draft</option></select></label><div className="admin-form-actions"><button className="glass-button" type="submit">{editing ? "Update project" : "Save project"}</button>{editing && <button className="cancel-edit" type="button" onClick={() => { setEditing(null); setForm(emptyForm); }}>Cancel</button>}</div></form><div className="admin-card project-list"><div className="list-title"><h2>Your projects</h2><span>{projects.length} items</span></div>{projects.map((project) => <div className="admin-project" key={project.id}><div className="admin-project-info"><strong>{project.title}</strong><span>{project.category} · {project.published === false ? "DRAFT" : "PUBLISHED"}</span></div><button onClick={() => { setEditing(project.id); setForm({ title: project.title || "", category: project.category || "WEB DEVELOPMENT", description: project.description || "", link: project.link || "", cover: project.cover_url || "", published: project.published !== false }); }}>Edit</button><button onClick={() => removeProject(project.id)}>Delete</button></div>)}</div></div><div className="admin-card" style={{ marginTop: 22 }}><div className="list-title"><h2>Inquiries</h2><span>{inquiries.filter((item) => !item.is_read).length} unread</span></div>{inquiries.length === 0 && <p>No inquiries yet.</p>}{inquiries.map((item) => <div className="admin-project" key={item.id}><div className="admin-project-info"><strong>{item.name} · {item.email}</strong><span>{item.message}</span></div><button onClick={() => markRead(item.id, !item.is_read)}>{item.is_read ? "Unread" : "Read"}</button><button onClick={() => removeInquiry(item.id)}>Delete</button></div>)}</div></div></div>;
}

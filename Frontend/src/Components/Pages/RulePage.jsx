import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function RulePage() {
  const navigate = useNavigate();
  const [ruleName,setRulename]=useState("New Rule");
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    body: "",
    cc: "",
    bcc: "",
    medium: "",
    recipient: "",
    template: "",
    delayedFor: "",
    isUnread: ""
  });

  const { profileId, ruleId } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedTemplate = formData.template
      .replace(/\{from\}/g, formData.from)
      .replace(/\{subject\}/g, formData.subject)
      .replace(/\{body\}/g, formData.body)
      .replace(/\{cc\}/g, formData.cc)
      .replace(/\{bcc\}/g, formData.bcc);

    const alertConfig = {
      type: formData.medium,
      recipient: formData.recipient,
      messageTemplate: parsedTemplate
    };

    const ruleConditions = {
      from: formData.from,
      subjectIncludes: formData.subject,
      bodyIncludes: formData.body,
      cc: formData.cc,
      bcc: formData.bcc,
      delayHours: formData.delayedFor,
      isUnread: formData.isUnread
    };

    if (ruleId === "newrule") {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${profileId}/rule/createrule`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ action: alertConfig, condition: ruleConditions, ruleName })
        });

        const data = await res.json();
        if (res.ok) {
          console.log("rule created successfully ", data);
          navigate(`/profile/${profileId}`);
        }
      } catch (e) {
        console.log("unable to create new rule ", e);
      }
    } 
    else {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${profileId}/rule/${ruleId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ action: alertConfig, condition: ruleConditions, ruleName })
        });

        const data = await res.json();
        if (res.ok) {
          console.log("rule updated successfully ", data);
          navigate(`/profile/${profileId}`);
        }
      } catch (e) {
        console.log("unable to update rule ", e);
      }
    }
  };

  const fetchrule = async () => {
    if (ruleId === "newrule") return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${profileId}/rule/${ruleId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      let data = await res.json();
      data = data.rule;
      if (res.ok) {
        setIsAuthorized(true);
        setFormData({
          from: data.condition?.from,
          subject: data.condition?.subjectIncludes,
          body: data.condition?.bodyIncludes,
          cc: data.condition?.cc,
          bcc: data.condition?.bcc,
          medium: data.action?.type,
          recipient: data.action?.recipient,
          template: data.action?.messageTemplate,
          delayedFor: `${data.condition?.delayHours} hr`,
          isUnread: data.condition?.isUnread
        });
      }
    } catch (e) {
      console.log("unable to fetch rule ", e);
    }
  };

  useEffect(() => {
    if (ruleId === "newrule") setIsAuthorized(true);
    fetchrule();
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${profileId}/rule/${ruleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (res.ok) {
      console.log("rule deleted successfully");
      navigate(`/profile/${profileId}`);
    }
  };

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    fontFamily: "Roboto, Arial, sans-serif"
  },
  headerInput: {
    width: "100%",
    border: "none",
    padding: "15px 20px",
    fontSize: "18px",
    fontWeight: 500,
    color: "white",
    backgroundColor: "#7868E6",
    outline: "none"
  },
  form: {
    padding: "20px"
  },
  row: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "2px solid #6499E9"
  },
  label: {
    width: "120px",
    color: "#082567",
    fontWeight: 500
  },
  input: {
    flex: 1,
    border: "none",
    padding: "8px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#FFFFFF"
  },
  select: {
    flex: 1,
    padding: "8px",
    fontSize: "14px",
    border: "0px solid #6499E9",
    borderRadius: "4px",
    outline: "none",
    backgroundColor: "#FFFFFF"
  },
  textarea: {
    width: "100%",
    minHeight: "150px",
    border: "2px solid #6499E9",
    borderRadius: "4px",
    padding: "12px",
    fontSize: "14px",
    resize: "vertical",
    marginTop: "5px",
    backgroundColor: "#FFFFFF"
  },
  shortTextarea: {
    width: "100%",
    minHeight: "80px",
    border: "2px solid #6499E9",
    borderRadius: "4px",
    padding: "12px",
    fontSize: "14px",
    resize: "vertical",
    marginTop: "5px",
    backgroundColor: "#FFFFFF"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "15px 0",
    gap: "10px"
  },
  btn: {
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    border: "none"
  },
  primary: {
    backgroundColor: "#7868E6",
    color: "white"
  },
  secondary: {
    backgroundColor: "white",
    color: "#7868E6",
    border: "2px solid #6499E9"
  }
};


  return !isAuthorized ? "Unauthorized" : (
    <div style={styles.container}>
      <input
        type="text"
        // placeholder="New Message"
        defaultValue="New Message"
        onChange={(e)=>setRulename(e.target.value)}
        style={styles.headerInput}
      />
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.row}>
          <label style={styles.label}>From</label>
          <input type="email" name="from" value={formData.from} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Cc</label>
          <input type="email" name="cc" value={formData.cc} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Bcc</label>
          <input type="email" name="bcc" value={formData.bcc} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Subject</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Body</label>
          <textarea name="body" value={formData.body} onChange={handleChange} style={styles.textarea} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Delayed For*</label>
          <select required name="delayedFor" value={formData.delayedFor} onChange={handleChange} style={styles.select}>
            <option value="">Select delay</option>
            <option value="2 hr">2 hr</option>
            <option value="6 hr">6 hr</option>
            <option value="12 hr">12 hr</option>
            <option value="18 hr">18 hr</option>
            <option value="24 hr">24 hr</option>
          </select>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Is Unread*</label>
          <select required name="isUnread" value={formData.isUnread} onChange={handleChange} style={styles.select}>
            <option value="">Select</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Medium*</label>
          <select required name="medium" value={formData.medium} onChange={handleChange} style={styles.select}>
            <option value="">Select medium</option>
            <option value="email">Email</option>
            <option value="slack">Slack</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Recipient*</label>
          <input required type="text" name="recipient" value={formData.recipient} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Template*</label>
        </div>
        <textarea
          required
          name="template"
          value={formData.template}
          onChange={handleChange}
          style={styles.shortTextarea}
          placeholder="Use {from}, {subject}, {body}, {cc}, {bcc}"
        />
        <div style={styles.buttonGroup}>
          {ruleId === "newrule" ? null : (
            <button onClick={handleDelete} type="button" style={{ ...styles.btn, ...styles.secondary }}>
              Delete Rule
            </button>
          )}
          <button type="submit" style={{ ...styles.btn, ...styles.primary }}>
            {ruleId === "newrule" ? "Create rule" : "Save Rule"}
          </button>
        </div>
      </form>
    </div>
  );
}

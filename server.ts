import express from "express";
import http from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const httpServer = http.createServer(app);

  app.use(express.json({ limit: "10mb" }));

  // Server-side Gemini initialization
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // API to generate AI Governance documents and policies using Gemini 3.6 Flash
  app.post("/api/ai/generate-doc", async (req, res) => {
    try {
      const { docType, unitName, systemData, customPrompt } = req.body;

      const systemInstruction = `คุณเป็นผู้เชี่ยวชาญและที่ปรึกษาด้านธรรมาภิบาลปัญญาประดิษฐ์ (AI Governance & Compliance Advisor) ระดับอาวุโส
ที่มีความเชี่ยวชาญลึกซึ้งในกรอบธรรมาภิบาล ETDA AIGC Guideline (Vol 1), ISO/IEC 42001:2023, ISO 23894, NIST AI RMF และ ร่าง พ.ร.บ. ปัญญาประดิษฐ์ พ.ศ. .... (65 มาตรา) ของประเทศไทย

ลักษณะการเขียน:
- ใช้ภาษาไทยระดับทางการ/ทางราชการ
- ใช้ Markdown ลำดับหัวข้อ (##, ###, -) ชัดเจน มีตารางสรุปหรือรายการ Checkbox
- ให้ข้อมูลละเอียด ละเอียดยิบ ครอบคลุมบริบทองค์กร และปฏิบัติตามกฎหมายอย่างเคร่งครัด`;

      let userPrompt = "";

      if (docType === "report") {
        userPrompt = `กรุณาจัดทำ "รายงานผลการประเมินธรรมาภิบาลและความเสี่ยงระบบปัญญาประดิษฐ์ (Executive AI Governance & Assessment Report)"
สำหรับหน่วยงาน: ${unitName || "ภาพรวมองค์กร"}
ข้อมูลระบบ AI ที่ลงทะเบียน:
${JSON.stringify(systemData, null, 2)}

ข้อกำหนดเพิ่มเติมจากผู้ใช้: ${customPrompt || "สรุปสถานะการจัดกลุ่ม Track (Fast track / Standard / Full track) และมาตรการ Human Oversight"}

โครงสร้างรายงานที่ต้องจัดทำ:
1. บทสรุปสำหรับผู้บริหาร (Executive Summary)
2. ทะเบียนและสถานะความเสี่ยงของระบบ AI (AI Inventory & Risk Classification Summary)
3. การวิเคราะห์ผลกระทบตามกรอบ ETDA Vol 1 และ ร่าง พ.ร.B. ปัญญาประดิษฐ์ (มาตราที่เกี่ยวข้อง)
4. ข้อกำหนดการควบคุมและการกำกับโดยมนุษย์ (Human Oversight, Guardrails & SOPs)
5. แผนการดำเนินงานและเอกสารสำคัญที่ต้องจัดทำเพิ่ม (Action Plan & Compliance Deliverables)`;
      } else if (docType === "policy") {
        userPrompt = `กรุณาร่าง "ประกาศนโยบายและแนวปฏิบัติการประยุกต์ใช้ปัญญาประดิษฐ์อย่างมีธรรมาภิบาล (Organizational AI Governance Policy & GenAI Code of Practice)"
สำหรับหน่วยงาน: ${unitName || "องค์กร"}
ขอบเขตการใช้งานระบบ AI / Use Case:
${JSON.stringify(systemData, null, 2)}

ข้อกำหนดเพิ่มเติมจากผู้ใช้: ${customPrompt || "เน้นการใช้งาน Generative AI อย่างปลอดภัย ไม่ละเมิดลิขสิทธิ์ และปกป้องข้อมูลส่วนบุคคล (PDPA)"}

โครงสร้างนโยบายที่ต้องจัดทำ:
1. วัตถุประสงค์และขอบเขตการบังคับใช้ (Purpose & Scope)
2. หลักการธรรมาภิบาล AI ขององค์กร (Core Governance Principles: Transparency, Fairness, Security, Accountability)
3. ข้อห้ามและความเสี่ยงที่ไม่สามารถยอมรับได้ (Unacceptable AI Use Cases - Gatekeeper Rules)
4. แนวปฏิบัติการใช้งาน Generative AI, RAG และ LLM (PII, Data Leakage & Copyright Guardrails)
5. โครงสร้างความรับผิดชอบ (Roles & Responsibilities: Executive, Business Owner, Technical Owner)
6. กระบวนการทบทวนและการปรับปรุงนโยบายประจำปี (Annual Policy Review)`;
      } else if (docType === "risk_mitigation") {
        userPrompt = `กรุณาจัดทำ "แผนบริหารจัดการความเสี่ยงและมาตรการลดผลกระทบ AI (AI Risk Mitigation & Technical Guardrails Standard)"
สำหรับหน่วยงาน: ${unitName || "หน่วยงานเจ้าของระบบ"}
ข้อมูลระบบ AI:
${JSON.stringify(systemData, null, 2)}

ข้อกำหนดเพิ่มเติมจากผู้ใช้: ${customPrompt || "เน้นการจัดการ Hallucination, Data Leakage, Bias และ System Failures"}

โครงสร้างเนื้อหาที่ต้องจัดทำ:
1. รายการความเสี่ยงหลักที่พบ (Identified Risk Factors)
2. มาตรการลดความเสี่ยงทางเทคนิค (Technical Guardrails - Input/Output Filtering, Red Teaming)
3. มาตรการทางบริหารจัดการ (Administrative & Operational Guardrails)
4. กระบวนการ Human Oversight (Human-in-the-loop / Human-over-the-loop Protocol)
5. แผนตอบสนองเหตุวิกฤตและระบบสำรอง (Incident Response & Fallback Protocol)`;
      } else if (docType === "job_redesign") {
        userPrompt = `กรุณาจัดทำ "แผนการออกแบบงานเพื่อรองรับการทำงานร่วมกับ AI (AI Job Redesign & Workforce Transition Plan)"
ตามกรอบแนวทาง AI Job Redesign Guideline ของ สพธอ. (ETDA) และหลักการ Human-Centered AI
สำหรับหน่วยงาน: ${unitName || "ภาพรวมองค์กร"}
ข้อมูลระบบ AI และกระบวนการที่เกี่ยวข้อง:
${JSON.stringify(systemData, null, 2)}

ข้อกำหนดเพิ่มเติมจากผู้ใช้: ${customPrompt || "วิเคราะห์ภาระงาน (Task Analysis), กำหนดระดับ AI Level 0-5, ออกแบบ Human-AI Workflow และจัดทำแผน Upskill/Reskill"}

โครงสร้างเอกสารที่ต้องจัดทำ:
1. การวิเคราะห์ผลกระทบ 3 ระดับ (Task Level, Job Position Level, Organizational Level)
2. การแตกกระบวนการย่อยและวิเคราะห์ภาระงาน (Task As-Is vs Task To-Be) ตาม 16 NIST AI Capabilities
3. การกำหนดระดับการใช้ AI (AI Level 0 ถึง Level 5) และความรับผิดชอบของคน (Human Responsibility)
4. การปรับปรุงคำบรรยายลักษณะงานและหน้าที่ความรับผิดชอบใหม่ (Redefined Responsibilities & Duties)
5. กรอบการพัฒนาทักษะ (AI Skills Development Plan): จำแนก Upskill vs Reskill ในมิติ Technical, Responsible AI/Ethics, และ Non-Technical
6. แผนการบริหารการเปลี่ยนแปลงบุคลากร (Change Management & Cultural Readiness)`;
      } else {
        userPrompt = customPrompt || "กรุณาจัดทำข้อแนะนำด้านธรรมาภิบาลปัญญาประดิษฐ์";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        text: response.text,
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI document",
      });
    }
  });

  // API to analyze, lean and redesign end-to-end business processes using Gemini 3.6 Flash
  app.post("/api/ai/lean-process", async (req, res) => {
    try {
      const { jobTitle, department, jobLevel, processName, rawProcessList, businessContext } = req.body;

      const systemInstruction = `คุณเป็นผู้เชี่ยวชาญระดับสูงด้าน Business Process Re-engineering (BPR), Lean Six Sigma และ AI Job Redesign ตามกรอบ สพธอ. ETDA (16 NIST AI Capabilities, AI Levels 0-5, ISO 42001 และ ร่าง พ.ร.บ. ปัญญาประดิษฐ์)
เป้าหมายของคุณคือรับรายการกระบวนงานเดิม (As-Is Processes) ที่ผู้ใช้กรอกมา แล้ววิเคราะห์:
1. กำจัดความสูญเปล่า (Lean Waste: การคีย์ข้อมูลซ้ำ, การรอคอย, การเดินแฟ้ม, Human Error จากความเหนื่อยล้า)
2. Redesign ปรับปรุงเป็นสายธารกระบวนงานใหม่ร่วมกับ AI ที่มีประสิทธิภาพสูงขึ้น 70-90%
3. ออกแบบชุดหลักสูตรอบรม (Training Plan), คู่มือ SOP ปฏิบัติงาน (SOP Cheat Sheet) และใบงานเวิร์กช็อป (Workshop Worksheet)

ตอบเป็น JSON เท่านั้น (Strict JSON Object ไม่มี markdown ครอบ)`;

      const userPrompt = `กรุณาวิเคราะห์และ Lean Redesign กระบวนงานสำหรับตำแหน่ง: "${jobTitle || 'ตำแหน่งงาน'}"
สังกัด: "${department || 'หน่วยงาน'}"
ระดับตำแหน่ง: "${jobLevel || 'Mid-Level'}"
ชื่องาน/กระบวนงานหลัก: "${processName || 'กระบวนงานหลัก'}"
บริบทเพิ่มเติม: "${businessContext || '-'}"

รายการกระบวนงานเดิมที่ผู้ใช้ระบุมา:
${Array.isArray(rawProcessList) ? rawProcessList.map((p: string, idx: number) => `${idx + 1}. ${p}`).join('\n') : String(rawProcessList)}

ตอบกลับเป็น JSON โครงสร้างตามนี้เท่านั้น:
{
  "jobTitle": "${jobTitle || 'ตำแหน่งงาน'}",
  "department": "${department || 'หน่วยงาน'}",
  "processName": "ชื่อกระบวนงานหลักที่กระชับและครอบคลุม",
  "originalObjective": "สรุปวัตถุประสงค์เดิมก่อนใช้ AI",
  "newObjective": "สรุปบทบาทหน้าที่ใหม่เมื่อปรับกระบวนงานร่วมกับ AI (To-Be Role)",
  "leanSummary": {
    "wasteIdentified": ["จุดสูญเปล่าที่พบ 1", "จุดสูญเปล่าที่พบ 2"],
    "overallTimeSavedPercent": 75,
    "keyTransformation": "สรุปการเปลี่ยนผ่านสำคัญ"
  },
  "processes": [
    {
      "processNumber": 1,
      "processPhase": "ต้นน้ำ (Input & Intake) หรือ กลางน้ำ (Processing & Analysis) หรือ ปลายน้ำ (Review, Decision & Delivery)",
      "subProcess": "ชื่อขั้นตอนกระบวนงานย่อย",
      "taskAsIs": "สิ่งที่คนทำเดิม",
      "leanWasteEliminated": "ความสูญเปล่าที่ตัดออกได้",
      "aiCapability": "เลือก 1 ใน 16 NIST AI Capabilities เช่น การสกัดข้อมูล, OCR, การสังเคราะห์เนื้อหา",
      "aiLevel": 2,
      "collaborationType": "Augmentation หรือ Automation หรือ Human-only",
      "taskToBe": "หน้าที่ AI ทำอะไร + หน้าที่คนทำอะไร",
      "governanceControl": "จุดตรวจความเสี่ยง ธรรมาภิบาล PDPA หรือ Human Sign-off",
      "skillsImpact": "Upskill หรือ Reskill",
      "durationAsIs": "เวลาเดิม เช่น 2 วัน",
      "durationToBe": "เวลาใหม่ เช่น 15 นาที",
      "estimatedTimeSavedPercent": 80
    }
  ],
  "competencies": {
    "technical": ["ทักษะเทคนิค 1", "ทักษะเทคนิค 2"],
    "responsibleEthics": ["ทักษะจริยธรรม/PDPA 1", "ทักษะจริยธรรม 2"],
    "nonTechnical": ["ทักษะคน/การตัดสินใจ 1", "ทักษะคน 2"]
  },
  "trainingPlan": {
    "courseTitle": "ชื่อหลักสูตรอบรมสำหรับตำแหน่งนี้",
    "targetAudience": "กลุ่มเป้าหมาย",
    "modules": [
      { "week": "สัปดาห์ที่ 1", "title": "...", "focus": "...", "toolUsed": "...", "deliverable": "..." },
      { "week": "สัปดาห์ที่ 2", "title": "...", "focus": "...", "toolUsed": "...", "deliverable": "..." },
      { "week": "สัปดาห์ที่ 3", "title": "...", "focus": "...", "toolUsed": "...", "deliverable": "..." },
      { "week": "สัปดาห์ที่ 4", "title": "...", "focus": "...", "toolUsed": "...", "deliverable": "..." }
    ]
  },
  "sopCheatSheet": {
    "aiResponsibilities": ["หน้าที่ของ AI ที่ได้รับอนุญาต"],
    "humanResponsibilities": ["หน้าที่ของคนในการตรวจสอบและตัดสินใจ"],
    "prohibitedActions": ["ข้อห้ามเด็ดขาด เช่น ห้าม AI อนุมัติโดยไม่มีคนตรวจ, ห้ามใส่ข้อมูลลับลงใน Public AI"],
    "checklistBeforeApproval": ["เช็คลิสต์ข้อ 1", "เช็คลิสต์ข้อ 2", "เช็คลิสต์ข้อ 3"]
  },
  "workshopWorksheet": {
    "promptExercises": [
      {
        "processStep": "...",
        "taskDescription": "...",
        "examplePromptTemplate": "คำสั่ง Prompt ตัวอย่างที่มีโครงสร้าง Role, Task, Context, Output format",
        "humanReviewChecklist": "จุดที่คนต้องตรวจทานความถูกต้อง"
      }
    ]
  },
  "leanToolsApplied": {
    "standardWork": "กำหนดขั้นตอนและมาตรฐานการปฏิบัติงานที่ชัดเจน เช่น กำหนดแบบฟอร์มกลางและเงื่อนไขข้อมูลที่ต้องระบุ",
    "onePieceFlow": "งานไหลต่อเนื่อง ไม่มีการรอคอยค้างท่อ หรือส่งต่องานข้ามไปมาแบบไร้ประสิทธิภาพ",
    "automation": "ระบบอัตโนมัติ AI และระบบงานดิจิทัล ลดภาระงานคีย์ข้อมูล ลดเวลาการประมวลผล",
    "errorProofing": "ระบบป้องกันความผิดพลาด ตรวจสอบได้ ทวนสอบได้ มีจุดตรวจทานก่อนการอนุมัติ (Poka-Yoke)"
  },
  "leanSolutionQuote": "ออกแบบกระบวนการใหม่ ให้คุณค่าไหลต่อเนื่อง ลดความสูญเปล่า",
  "beforeFooterBadge": "ล่าช้า | รอคอย | เสี่ยงผิดพลาด",
  "afterFooterBadge": "เร็วขึ้น | ต่อเนื่อง | ปลอดภัย | แม่นยำ",
  "aiStudioPrompt": "# Google AI Studio - Master System Instructions\\n## 1. บทบาทและหน้าที่ (Role & Persona)\\nคุณคือระบบ AI อัจฉริยะสำหรับ...\\n\\n## 2. ขั้นตอนการทำงาน To-Be (Lean Workflow)\\n1. ...\\n2. ...\\n\\n## 3. กฎ Lean & การกำกับดูแล (ETDA Governance)\\n- การป้องกันข้อผิดพลาด (Poka-Yoke)...\\n- จุดที่มนุษย์ต้องอนุมัติ (Human-in-the-Loop Gate)...\\n\\n## 4. โครงสร้างผลลัพธ์ (Output Format)\\nตอบกลับเป็น Markdown ชัดเจน..."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      let parsedResult;
      try {
        const text = response.text || "{}";
        // Clean markdown backticks if any
        const cleaned = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        parsedResult = JSON.parse(cleaned);
      } catch (parseErr) {
        console.error("Failed to parse JSON from Gemini response:", parseErr);
        parsedResult = null;
      }

      if (parsedResult) {
        res.json({
          success: true,
          data: parsedResult,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "ไม่สามารถแปลงผลลัพธ์ของโมเดลเป็นโครงสร้างกระบวนงานได้",
          rawText: response.text,
        });
      }
    } catch (error: any) {
      console.error("Gemini Lean Process Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to analyze and lean process",
      });
    }
  });

  // Explicitly serve static assets from public folder (PDFs, icons, etc.)
  const publicDir = path.resolve(process.cwd(), "public");
  app.use("/assets", express.static(path.resolve(publicDir, "assets"), {
    maxAge: "1d",
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      }
    },
  }));
  app.use(express.static(publicDir));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      // ให้ HMR WebSocket ใช้พอร์ตเดียวกับ Express (จำเป็นสำหรับ GitHub Codespaces port forwarding)
      server: { middlewareMode: true, hmr: { server: httpServer } },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

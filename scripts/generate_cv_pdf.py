#!/usr/bin/env python3
"""Generate a clean, recruiter-ready single-column ATS PDF CV."""

from pathlib import Path
from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "assets" / "Maliha_Masud_DPT_Physiotherapist_CV.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)


class CVPDF(FPDF):
    def __init__(self):
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=True, margin=14)
        self.set_margins(14, 12, 14)

    def header_block(self):
        self.set_font("Helvetica", "B", 16)
        self.set_text_color(15, 28, 36)
        self.cell(0, 7, "MALIHA MASUD, PT, DPT", ln=True)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(15, 110, 122)
        self.cell(0, 5, "Physiotherapist  |  Doctor of Physiotherapy", ln=True)
        self.ln(1.5)
        self.set_draw_color(15, 110, 122)
        self.set_line_width(0.4)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(3)
        self.set_font("Helvetica", "", 8.5)
        self.set_text_color(61, 85, 99)
        self.multi_cell(
            0,
            4,
            "B-6 Jinnah Avenue, Eden Valley, Faisalabad, Pakistan\n"
            "+92 337 9780015  |  malihamasud128@gmail.com\n"
            "PPTA Member P14418  |  World Physiotherapy  |  "
            "Portfolio: maliha-masud-dpt.vercel.app",
        )
        self.ln(2)

    def section(self, title: str):
        self.ln(1.5)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(15, 28, 36)
        self.cell(0, 5.5, title.upper(), ln=True)
        self.set_draw_color(197, 220, 227)
        self.set_line_width(0.3)
        y = self.get_y()
        self.line(self.l_margin, y, self.w - self.r_margin, y)
        self.ln(2.2)

    def body(self, text: str):
        self.set_font("Helvetica", "", 9)
        self.set_text_color(30, 40, 48)
        self.multi_cell(0, 4.1, text)
        self.ln(0.8)

    def job(self, role: str, org: str, dates: str):
        self.set_font("Helvetica", "B", 9.5)
        self.set_text_color(15, 28, 36)
        self.cell(0, 4.5, role, ln=True)
        self.set_font("Helvetica", "", 8.5)
        self.set_text_color(15, 110, 122)
        self.cell(0, 4, f"{org}  |  {dates}", ln=True)
        self.ln(0.6)

    def bullet(self, text: str):
        self.set_font("Helvetica", "", 8.8)
        self.set_text_color(30, 40, 48)
        x = self.l_margin
        self.set_x(x)
        self.cell(4, 3.9, "-")
        self.multi_cell(self.w - self.l_margin - self.r_margin - 4, 3.9, text)
        self.ln(0.3)

    def edu(self, title: str, detail: str):
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(15, 28, 36)
        self.cell(0, 4.2, title, ln=True)
        self.set_font("Helvetica", "", 8.5)
        self.set_text_color(61, 85, 99)
        self.multi_cell(0, 3.9, detail)
        self.ln(0.8)


def build():
    pdf = CVPDF()
    pdf.add_page()
    pdf.header_block()

    pdf.section("Professional Summary")
    pdf.body(
        "Early-career Doctor of Physiotherapy (CGPA 3.58/4.00) practising as a Clinical "
        "Physiotherapist at Madina Teaching Hospital. Evaluates neuromuscular and "
        "musculoskeletal conditions, manages tailored rehabilitation protocols, and "
        "delivers assessment, exercise prescription, manual therapy, electrotherapy, "
        "patient education and clinical documentation across musculoskeletal, neurological "
        "and post-operative pathways. Supports multidisciplinary care and clinical teaching "
        "in physiotherapy OPD. Member of PPTA and World Physiotherapy. Ready to adopt the "
        "registration pathway required for a job offer abroad."
    )

    pdf.section("Clinical Experience")
    pdf.job(
        "Clinical Physiotherapist",
        "Madina Teaching Hospital (MTH), Faisalabad, Pakistan",
        "18 Dec 2024 - Present",
    )
    for item in [
        "Evaluate neuromuscular and musculoskeletal conditions while managing tailored rehabilitation protocols for diverse patient demographics.",
        "Restore functional mobility through therapeutic exercise, mobility training, manual therapy and modality-based care.",
        "Apply electrotherapy and physical agents as indicated (ultrasound, TENS, heat and cold therapy).",
        "Educate patients and caregivers on posture, activity modification, home exercise programmes and prevention strategies.",
        "Maintain accurate clinical documentation and progress notes to support continuity of care.",
        "Collaborate with physicians, nurses and allied colleagues in a multidisciplinary teaching-hospital environment.",
    ]:
        pdf.bullet(item)

    pdf.ln(1)
    pdf.job(
        "Lectureship - Physiotherapy OPD",
        "Madina Teaching Hospital (MTH), Faisalabad, Pakistan",
        "27 Oct 2025 - 27 May 2026",
    )
    for item in [
        "Provided clinical instructional guidance, bedside assessment protocols and procedural demonstrations for students and junior clinical interns.",
        "Reinforced professional communication, patient dignity and safe handling practices during supervised teaching encounters.",
    ]:
        pdf.bullet(item)

    pdf.section("Education")
    pdf.edu(
        "Doctor of Physiotherapy (DPT) - CGPA 3.58 / 4.00",
        "The University of Faisalabad, Pakistan  |  Sep 2019 - Aug 2024\n"
        "Core domains: musculoskeletal, neurological and post-operative rehabilitation; "
        "assessment; exercise prescription; manual therapy; electrotherapy; evidence-based practice.",
    )
    pdf.edu(
        "Higher Secondary School Certificate (F.Sc Pre-Medical) - Grade A",
        "Punjab Group of Colleges, Faisalabad  |  2017 - 2019",
    )
    pdf.edu(
        "Secondary School Certificate - Grade A",
        "Kindergarten Muslim Girls High School, Faisalabad  |  Completed 2017",
    )

    pdf.section("Professional Membership")
    pdf.bullet("Pakistan Physical Therapy Association (PPTA) - Membership No. P14418 (Dec 2024 - 31 Dec 2029)")
    pdf.bullet("World Physiotherapy - Member through PPTA national membership")

    pdf.section("Clinical Competencies")
    pdf.body(
        "Assessment & Planning: patient assessment, rehabilitation planning, progress monitoring, supervised clinical reasoning.\n"
        "Interventions: exercise prescription, manual therapy, electrotherapy, ultrasound, TENS, heat/cold therapy, mobility and strengthening programmes.\n"
        "Professional Practice: patient education, clinical documentation, multidisciplinary teamwork, evidence-based practice, teaching support.\n"
        "Digital: Microsoft Office, Google Workspace, telemedicine platform familiarity."
    )

    pdf.section("Continuing Professional Development")
    for item in [
        "Advanced Dry Needling Techniques - one-day hands-on workshop, The University of Faisalabad (29 Sep 2023).",
        "Comprehensive Neurological Assessment and Differential Diagnosis of Stroke and Cerebral Palsy - workshop participation.",
        "Spinal Mobilisation Concepts (Kaltenborn, Maitland, Mulligan frameworks) - workshop participation.",
        "Online CPD: Low Back Pain and Pelvic Floor Dysfunction.",
    ]:
        pdf.bullet(item)

    pdf.section("Research")
    pdf.body(
        'Research project: "Prevalence of myofascial trigger points in subacute hemiplegic '
        "patients' unaffected shoulder and its association with muscle tone.\" "
        "Associated with Pakistan Armed Forces Medical Journal (PAFMJ) on prior application materials; "
        "full citation available on request."
    )

    pdf.section("Languages & Additional Information")
    pdf.bullet("Urdu - Native; English - B2 (formal IELTS/OET evidence in preparation for registration).")
    pdf.bullet("University medical/public-health camp participation; event hosting and sports club engagement.")
    pdf.bullet(
        "Ready to adopt the registration pathway required on a job offer abroad. Willing to relocate subject to visa requirements."
    )
    pdf.bullet("References available on request. Placement contact: Omer Farooq Qureshi, Management Placement Bureau, The University of Faisalabad (+92 321 5721448).")

    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    build()

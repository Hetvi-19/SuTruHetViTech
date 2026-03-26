# AetherMed AI
### *Your Health, Decoded. A Futuristic AI-Powered Medical Command Center.*

---

## 🚀 The Pitch: Healthcare for the Future

**"What if your medical reports could talk to you? What if your medicine cabinet had a brain?"**

In today's fast-paced world, healthcare is often a race against time and a struggle with complex jargon. Patients walk out of clinics with reports they don't understand and medicines they can't pronounce. **AetherMed AI** is a futuristic, AI-powered health command center designed to bridge this gap.

By combining **Google’s Gemini AI** with a secure, real-time **Firebase backend**, we have created a "Digital Health Companion" that doesn't just store data—it understands it. Whether it's scanning a medicine strip to identify side effects, predicting potential illnesses from symptoms, or managing the health profiles of an entire 4-generation household, AetherMed AI makes healthcare **understandable, accessible, and proactive.**

We aren't just building an app; we are building the future of personalized family medicine.

---

## 🏗 Project Development: The 4-Part Roadmap

To bring AetherMed AI to life, the project was divided into these four critical phases:

### **Part 1: The Core Infrastructure (The Foundation)**
*   **Focus:** Setting up the "Engine Room."
*   **Tasks:** Initializing the React-Vite environment, configuring Firebase Authentication (Google & Email), and designing the NoSQL Firestore schema. This phase ensured that the app was secure and scalable from day one.

### **Part 2: The Intelligence Layer (The Brain)**
*   **Focus:** Integrating AI and Multimodal capabilities.
*   **Tasks:** Connecting the Gemini API, engineering complex system instructions for medical accuracy, and implementing the "Vision" pipeline (OCR) to read medicine strips and medical reports from images.

### **Part 3: The Futuristic Interface (The Face)**
*   **Focus:** UI/UX and Visual Identity.
*   **Tasks:** Developing the "Glassmorphism" design system using Tailwind CSS. Implementing `motion` for fluid animations and creating the 3D medical scenes to give the app its high-end, futuristic aesthetic.

### **Part 4: The Family Ecosystem (The Connectivity)**
*   **Focus:** Multi-user logic and Persistence.
*   **Tasks:** Building the "Family Hub" to allow profile switching, implementing real-time data syncing via `onSnapshot`, and creating the persistent AI Chat history that "remembers" user context across sessions.

---

## 👥 Team Roles & Contributions

Our team was organized to ensure every aspect of the project—from security to aesthetics—was handled by a specialist:

#### **1. The Full-Stack Architect (Backend & Security)**
*   **Contribution:** The "Guardian" of the data.
*   **Key Work:** Wrote the **Firestore Security Rules** for patient privacy, set up the **Firebase Authentication** flow, and implemented the **Global Error Boundary**. They ensured the app is resilient and handles errors gracefully.

#### **2. The AI Engineer (Intelligence & Logic)**
*   **Contribution:** The "Voice" and "Sight" of the app.
*   **Key Work:** Handled the **Gemini API integration** and **Prompt Engineering**. They built the logic that allows the AI to "read" medical history and provide personalized, context-aware answers in the chat.

#### **3. The UI/UX & Frontend Developer (Experience & Design)**
*   **Contribution:** The one who made the app "Feel" like the future.
*   **Key Work:** Built the **Responsive Layout**, **Bottom Navigation**, and the **Glassmorphism design system**. They were responsible for the **Tailwind styling** and the **Motion animations** that define the user experience.

#### **4. The Product Manager & QA (Strategy & Quality)**
*   **Contribution:** The "Bridge" between the user and the tech.
*   **Key Work:** Defined the **Product Roadmap**, managed the **Firebase Blueprint** for data consistency, and conducted rigorous **End-to-End Testing**. They ensured that the final product met the high standards of a medical-grade application.

---

## 💻 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Motion (Framer Motion) |
| **Backend** | Node.js, Express (Full-Stack Proxy) |
| **Database & Auth** | Firebase Firestore (NoSQL), Firebase Authentication |
| **AI Model** | **Gemini 3.1 Flash** (via `@google/genai` SDK) |
| **Visualization** | Three.js (Medical Scene), Lucide React (Icons) |

---

## 🧠 Key AI Capabilities

*   **Multimodal Document Processing:** Parses handwritten prescriptions and lab reports with high OCR accuracy.
*   **Structured Output Generation:** Ensures deterministic data for diet plans and medicine lists.
*   **Context Window Management:** Manages patient history and family profiles for longitudinal insights.
*   **Zero-Shot Medical Reasoning:** Identifies potential drug interactions and localized medicine alternatives.

---

## 🚀 Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/aethermed-ai.git
    cd aethermed-ai
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file and add your `GEMINI_API_KEY`. Firebase configuration is loaded from `firebase-applet-config.json`.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

---

*Disclaimer: AetherMed AI is an experimental tool and should not replace professional medical advice. Always consult with a qualified healthcare provider.*

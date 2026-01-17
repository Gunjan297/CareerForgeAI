"use client";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume } from "@/actions/resume";
import  EntryForm  from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { resumeSchema } from "@/app/lib/schema";
import BulletInput from "./bullet-input";
import {getContactMarkdown, entriesToMarkdown, getAchievementsMarkdown, getPorMarkdown } from "@/app/lib/markdownHelper";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";


const ResumeBuilder = ({initialContent}) => {
    const [activeTab, setActiveTab] = useState("edit");
    const [resumeMode, setResumeMode] = useState("preview");
    const [previewContent, setPreviewContent] = useState(initialContent);
    const { user } = useUser();
    const [isGenerating, setIsGenerating] = useState(false);

    const {register,handleSubmit,watch,control,formState:{errors}} = useForm({
            resolver:zodResolver(resumeSchema),
            defaultValues: {
            contactInfo: {
              email: "",
              mobile: "",
              linkedin: "",
              twitter: ""
            },
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: [],
            achievements: [],
            positionOfResponsibility: [],
            },
        });

    const {
        loading: isSaving,
        fn: saveResumeFn,
        data: saveResult,
        error: saveError,
    } = useFetch(saveResume);

    const formValues = watch(); //used to re-render this component whenever ANY field in the form changes.

    useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  // Update preview content when form values change
  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);
  
  const getCombinedContent = () => {
    const {contactInfo, summary, skills, experience, education, projects, achievements, positionOfResponsibility} = formValues;
    return [
      getContactMarkdown({
      contactInfo: contactInfo,
      fullName: user?.fullName || "",
    }),
      summary && `## Professional Summary\n\n${summary}`,
      entriesToMarkdown(education, "Education"),
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(projects, "Projects"),
      getAchievementsMarkdown(achievements),
      getPorMarkdown(positionOfResponsibility),
    ]
      .filter(Boolean) //.filter(Boolean) removes all: "" → empty string , undefined → if function returns nothing
      .join("\n\n");
  };

const generatePDF = async () => {
  setIsGenerating(true);

  try {
    const element = document.getElementById("resume-pdf");
    if (!element) return;

    await new Promise((r) => setTimeout(r, 100));//Wait for layout & fonts to finish an dcompete render

    // Render DOM → Canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");

    const pageHeight = 297;
    const pageWidth = 210;

    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    let remainingHeight = imgHeight;
    let position = 0;

    while (remainingHeight > 0) {
      const heightLeft = remainingHeight > pageHeight ? pageHeight : remainingHeight;
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        -position, // shift image up for next page
        pageWidth,
        imgHeight
      );
      remainingHeight -= pageHeight;
      position += pageHeight;

      if (remainingHeight > 0) pdf.addPage();
    }

    pdf.save("resume.pdf");
  } catch (err) {
    console.error("PDF generation failed:", err);
  } finally {
    setIsGenerating(false);
  }
};

useEffect(()=>{
  if(saveResult && !isSaving){
    toast.success("Resume saved successfully");
  }
  if(saveError){
    toast.error(saveError.message || "Failed to save resume");
  }
},[isSaving, saveResult, saveError])

  const onSubmit = async(data)=>{
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  }
  return (
    <div data-color-mode="light" className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 gap-4 border-b border-orange-500/30 pb-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-100 via-orange-200 to-orange-400 bg-clip-text text-transparent text-center">
          Resume Builder
        </h1>

        <div className="space-x-2">
          <Button
            variant="destructive"
            className="px-6 py-2 rounded-lg font-medium text-orange-700 bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-100 hover:to-orange-200 transition-all duration-300"
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </div>
      </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-neutral-900 border border-orange-500/30">
          <TabsTrigger value="edit" className="data-[state=active]:bg-orange-600 data-[state=active]:text-orange-300">Form</TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-orange-600 data-[state=active]:text-orange-300">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit"  >
            
             <form className="space-y-10 bg-neutral-900 p-6 rounded-xl border border-orange-500/20">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-200">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 border border-orange-500/30 rounded-lg bg-black">
                
                <div className="space-y-2">
                   <h6 className="text-sm font-bold text-orange-200">Email</h6>
              <Controller
                name="contactInfo.email"
                control={control}
                render={({ field }) => (
                  <Input   // Using Controller because field is heavily watched and part of live preview logic: needs to be in continuous sync
                    {...field}
                    placeholder="your@email.com"
                    error={errors.contactInfo?.email}
                  />
                )}
              />
              {errors.contactInfo?.email && (
                <p className="text-sm text-red-500">{errors.contactInfo?.email.message}</p>
              )}
                </div>

                <div className="space-y-2">
                <h6 className="text-sm font-bold text-orange-200">Mobile Number</h6>
              <Controller
                name="contactInfo.mobile"
                control={control}
                render={({ field }) => (
                  <Input   // Using Controller because field is heavily watched and part of live preview logic: needs to be in continuous sync
                    {...field}
                    placeholder="+1 234 567 8900"
                    error={errors.contactInfo?.mobile}
                  />
                )}
              />
              {errors.contactInfo?.mobile && (
                <p className="text-sm text-red-500">{errors.contactInfo?.mobile.message}</p>
              )}
                </div>

                <div className="space-y-2">                  
                  <h6 className="text-sm font-bold text-orange-200">LinkedIn URL</h6>
              <Controller
                name="contactInfo.linkedin"
                control={control}
                render={({ field }) => (
                  <Input   // Using Controller because field is heavily watched and part of live preview logic: needs to be in continuous sync
                    {...field}
                    placeholder="https://linkedin.com/in/your-profile"
                    error={errors.contactInfo?.linkedin}
                  />
                )}
              />
              {errors.contactInfo?.linkedin && (
                <p className="text-sm text-red-500">{errors.contactInfo?.linkedin.message}</p>
              )}
                </div>

                <div className="space-y-2">
                <h6 className="text-sm font-bold text-orange-200">Twitter/X Profile</h6>
              <Controller
                name="contactInfo.twitter"
                control={control}
                render={({ field }) => (
                  <Input   // Using Controller because field is heavily watched and part of live preview logic: needs to be in continuous sync
                    {...field}
                    placeholder="https://twitter.com/your-handle"
                    error={errors.contactInfo?.twitter}
                  />
                )}
              />
              {errors.contactInfo?.twitter && (
                <p className="text-sm text-red-500">{errors.contactInfo?.twitter.message}</p>
              )}
                </div>
              </div>
            </div>

            <div className="space-y-4 p-5 border border-orange-500/30 rounded-lg bg-black">
              <h3 className="text-lg font-medium text-orange-200">Professional Summary</h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea   // Using Controller because field is heavily watched and part of live preview logic: needs to be in continuous sync
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary..."
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>

              <div className="space-y-4 p-5 border border-orange-500/30 rounded-lg bg-black">
              <h3 className="text-lg font-medium text-orange-200">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
            </div>

            <div className="space-y-4  p-5 border border-orange-500/30 rounded-lg bg-black">
              <h3 className="text-lg font-medium text-orange-200">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your key skills..."
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

              <div className="space-y-4 p-5 border border-orange-500/30 rounded-lg bg-black">
              <h3 className="text-lg font-medium text-orange-200">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-4 p-5 border border-orange-500/30 rounded-lg bg-black">
              <h3 className="text-lg font-medium text-orange-200">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
            </div>

            <div className="space-y-4 p-5 border border-orange-500/30 rounded-lg bg-black">
              <Controller
                name="achievements"
                control={control}
                render={({ field }) => (
                  <BulletInput
                    label="Achievements"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="List your key achievements..."
                  />
                )}
              />
              {errors.achievements && (
                <p className="text-sm text-red-500">
                  {errors.achievements.message}
                </p>
              )}
            </div>

            <div className="space-y-4 p-5 border border-orange-500/30 rounded-lg bg-black">
            <Controller
              name="positionOfResponsibility"
              control={control}
              render={({ field }) => (
                <BulletInput
                  label="Position of Responsibility"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="List your key positionOfResponsibility..."
                />
              )}
            />
            {errors.positionOfResponsibility && (
              <p className="text-sm text-red-500">
                {errors.positionOfResponsibility.message}
              </p>
            )}
          </div>

             </form>
        </TabsContent>

        <TabsContent value="preview">
            <div className="flex gap-236">
              <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
              
              <Button onClick={generatePDF} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
            </div>

            {resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose editied markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>
          
          {/* to generate pdf */}
      <div
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div
        id="resume-pdf"
        className="markdown-body"
        style={{
          width: "210mm",
          minHeight: "297mm",
          background: "#ffffff",
          color: "#000000",
          padding: "10mm",       // padding inside page
          boxSizing: "border-box",
          fontSize: "12pt",      // standard resume font size
          lineHeight: 1,       // spacing between lines
        }}
      >
        <MDEditor.Markdown source={previewContent} />
      </div>
    </div>


        </TabsContent>
        </Tabs>
    </div>
  );
};

export default ResumeBuilder

import { LensHeader } from "./_components/lens-header";
import { ScoreMetrics } from "./_components/score-metrics";
import { AISuggestions } from "./_components/ai-suggestions";
import { ContentPreview } from "./_components/content-preview";
import { ActionFooter } from "./_components/action-footer";
import Button from "@/components/ui/Button";

export default function LensPage() {
    return (
        <div className="w-full min-h-screen space-y-6 md:space-y-8 bg-transparent p-4 md:p-0 pb-24 md:pb-6 font-sans antialiased">
            {/* Box 1 */}
            <LensHeader subtitle="Podcast Episode 12" />


            {/* Box 2 */}
            <ScoreMetrics />

            {/* Box 3 */}
            <AISuggestions />

            {/* Box 4 */}
            <ContentPreview />

            <div className="block sm:hidden w-full pt-2">
                <Button
                    type="button"
                    className="w-full py-3.5 text-sm font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                    <span>Export</span>
                    <span>&rarr;</span>
                </Button>
            </div>

            {/* Box 5 */}
            <ActionFooter />
        </div>
    );
}
import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section-new">
            <div className="cta-badge">Start learning your way.</div>
            
            <div className="cta-content">
                <h2 className="cta-title">
                    Start your learning journey with AI Coach
                </h2>
                <p className="cta-description">
                    Choose a name, subject, voice, and personality — then start learning through natural voice conversations that make studying engaging and effective.
                </p>
            </div>

            <Link href="/companions/new" className="cta-button">
                <Image src="/icons/plus.svg" alt="plus" width={16} height={16}/>
                <span>Create your own AI Coach</span>
            </Link>
        </section>
    )
}
export default Cta

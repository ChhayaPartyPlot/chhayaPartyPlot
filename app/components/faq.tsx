import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How can I check date availability?",
    answer:
      "Simply select your preferred date from the calendar. If the date is available, you can submit an enquiry directly.",
  },
  {
    question: "How many guests can the venue accommodate?",
    answer:
      "Our venue offers a spacious lawn and banquet hall suitable for both small and large gatherings.",
  },
  {
    question: "Can I book multiple days?",
    answer:
      "Yes, you can select multiple booking days while submitting your enquiry.",
  },
  {
    question: "Is parking available at the venue?",
    answer: "Yes, we provide ample parking space for guests.",
  },
  {
    question: "What types of events can be hosted?",
    answer:
      "We host weddings, receptions, birthdays, corporate events, engagements, and other celebrations.",
  },
];
function FAQSection() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 mt-16 mb-12">
      {/* Heading */}

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      {/* Divider */}

      <div className="w-96 h-[2px] bg-[#c3ca6d] mx-auto mb-8"></div>

      {/* FAQ List */}

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="w-full space-y-3"
      >
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className=" px-4">
            <AccordionTrigger className="text-left font-semibold justify-start items-start">
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className="text-gray-600 text-sm sm:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default FAQSection;

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable react/no-unescaped-entities */
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const App: React.FC = () => {
  const [playerID, setPlayerID] = useState("PLAYER123456789");
  const [isCopied, setIsCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: number; text: string; sender: string; time: string }>
  >([
    {
      id: 1,
      text: "Hello! How can I assist you today with your gaming experience?",
      sender: "agent",
      time: "10:05 AM",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const commonMessages = {
    account: [
      "I need to update my account details.",
      "How do I verify my account?",
      "I can't access my account.",
      "I want to change my password.",
    ],
    payment: [
      "My withdrawal is pending for too long.",
      "I haven't received my deposit yet.",
      "What payment methods do you accept?",
      "I need to update my payment information.",
    ],
    technical: [
      "The game keeps freezing on my screen.",
      "I'm experiencing lag during gameplay.",
      "The website is not loading properly.",
      "I can't access certain games on my device.",
    ],
  };

  const faqs = [
    {
      question: "What is the minimum withdrawal amount?",
      answer:
        "The minimum withdrawal amount is $20. Please note that withdrawal processing times may vary depending on your payment method.",
    },
    {
      question: "How long does verification take?",
      answer:
        "Account verification typically takes 24-48 hours after all required documents have been submitted. During peak times, this process may take slightly longer.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption and security protocols to protect your personal and financial information. Your data is never shared with unauthorized third parties.",
    },
    {
      question: "What should I do if I forgot my password?",
      answer:
        "Click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password. If you don't receive the email, please check your spam folder.",
    },
    {
      question: "How do I claim a bonus?",
      answer:
        "To claim a bonus, navigate to the Promotions section, select the bonus you want to claim, and follow the instructions. Some bonuses may require a bonus code during deposit.",
    },
    {
      question: "What are the wagering requirements?",
      answer:
        "Wagering requirements vary by promotion. Generally, bonuses must be wagered 30-40 times before withdrawal. Please check the specific terms for each promotion.",
    },
    {
      question: "Can I play on mobile devices?",
      answer:
        "Yes, our platform is fully optimized for mobile play. You can access all games and features through your mobile browser without downloading any apps.",
    },
    {
      question: "How do I report a technical issue?",
      answer:
        "You can report technical issues through this live chat support, or by emailing support@igamingplatform.com with details of the issue and screenshots if possible.",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show temporary tooltip or notification
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chat and Player Info */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      Live Chat Support
                    </CardTitle>
                    <CardDescription className="text-gray-100 mt-1">
                      We're here to help 24/7
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-white/10 text-white border-0 px-3 py-1"
                  >
                    Online
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Player ID Section */}
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Player ID</p>
                      <p className="font-mono font-medium">{playerID}</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip open={isCopied}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(playerID)}
                            className="!rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-copy mr-2"></i>
                            {isCopied ? "Copied!" : "Copy ID"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copied to clipboard!</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Info Message */}
                <Alert className="m-4 bg-blue-50 border-blue-200">
                  <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                  <AlertTitle>Important Information</AlertTitle>
                  <AlertDescription>
                    Our support team is currently experiencing high volume.
                    Expected response time is 5-10 minutes. Thank you for your
                    patience.
                  </AlertDescription>
                </Alert>

                {/* Chat Messages */}
              </CardContent>

              <CardFooter className="border-t p-4  !flex flex-col md:flex-row">
                <div className="space-y-6 w-full">
                  {/* Common Messages */}
                  <Card className="shadow-lg border-0 !w-full ">
                    <CardHeader>
                      <CardTitle>Common Messages</CardTitle>
                      <CardDescription>
                        Click to copy these frequently used messages
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger
                            value="account"
                            className="!rounded-button whitespace-nowrap"
                          >
                            Account
                          </TabsTrigger>
                          <TabsTrigger
                            value="payment"
                            className="!rounded-button whitespace-nowrap"
                          >
                            Payment
                          </TabsTrigger>
                          <TabsTrigger
                            value="technical"
                            className="!rounded-button whitespace-nowrap"
                          >
                            Technical
                          </TabsTrigger>
                        </TabsList>

                        {Object.entries(commonMessages).map(
                          ([category, messages]) => (
                            <TabsContent
                              key={category}
                              value={category}
                              className="mt-0"
                            >
                              <div className="space-y-2">
                                {messages.map((msg, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                  >
                                    <p className="text-sm text-gray-700 mr-2">
                                      {msg}
                                    </p>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyMessage(msg)}
                                            className="!rounded-button whitespace-nowrap cursor-pointer"
                                          >
                                            <i className="fas fa-copy"></i>
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Copy to clipboard</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                          )
                        )}
                      </Tabs>
                    </CardContent>
                  </Card>

                  {/* FAQ Section */}
                  <Card className="shadow-lg border-0  w-full">
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription>
                        Find quick answers to common questions
                      </CardDescription>
                      <div className="mt-2">
                        <div className="relative">
                          <Input
                            placeholder="Search FAQs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px] pr-4">
                        <Accordion type="single" collapsible className="w-full">
                          {filteredFaqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger className="text-left hover:no-underline">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pt-2 pb-4">
                                  <p className="text-gray-700">{faq.answer}</p>
                                  <div className="flex justify-end mt-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              copyMessage(faq.answer)
                                            }
                                            className="!rounded-button whitespace-nowrap cursor-pointer"
                                          >
                                            <i className="fas fa-copy mr-2"></i>
                                            Copy Answer
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Copy to clipboard</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                          {filteredFaqs.length === 0 && (
                            <div className="py-8 text-center">
                              <i className="fas fa-search text-gray-300 text-4xl mb-3"></i>
                              <p className="text-gray-500">
                                No results found for "{searchQuery}"
                              </p>
                              <p className="text-gray-400 text-sm mt-1">
                                Try different keywords or browse all FAQs
                              </p>
                            </div>
                          )}
                        </Accordion>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <p className="text-sm text-gray-500">
                        Can't find what you're looking for?
                      </p>
                      <Button
                        variant="link"
                        className="text-indigo-600 hover:text-indigo-800 p-0 h-auto !rounded-button whitespace-nowrap"
                        onClick={() => {
                          setMessage(
                            "I couldn't find my answer in the FAQs. I need assistance with: "
                          );
                          document.querySelector("textarea")?.focus();
                        }}
                      >
                        Ask in chat <i className="fas fa-arrow-right ml-1"></i>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Quick Messages and FAQs */}
        </div>
      </div>
    </div>
  );
};

export default App;

import { motion } from 'framer-motion';
import { Check, Award, TrendingUp } from 'lucide-react';

const PropertySales = () => {
  const benefits = [
    {
      title: "Expert Guidance",
      description: "Our experienced agents provide personalized support throughout the selling process",
      icon: <Check className="w-6 h-6" />
    },
    {
      title: "Maximum Value",
      description: "Strategic pricing and marketing to achieve the best possible sale price",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Premium Service",
      description: "Comprehensive service package including professional photography and staging",
      icon: <Award className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-stone-50">
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Property Sales Services
            </h1>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Maximize your property's value with our premium sales service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-stone-900 text-white rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-stone-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Our Sales Process
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              A streamlined approach to selling your property
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: 1, title: "Initial Consultation", description: "We assess your property and discuss your goals" },
              { step: 2, title: "Property Preparation", description: "Professional staging and photography" },
              { step: 3, title: "Marketing Campaign", description: "Multi-channel marketing to reach qualified buyers" },
              { step: 4, title: "Showings & Negotiations", description: "Expert handling of viewings and offers" },
              { step: 5, title: "Closing", description: "Smooth transaction management to completion" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Sell Your Property?
            </h2>
            <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
              Contact us today for a free property valuation and consultation
            </p>
            <button className="bg-white text-stone-900 px-8 py-3 rounded-lg hover:bg-stone-100 transition-colors">
              Get Started
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PropertySales;
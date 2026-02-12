// De exemplu: components/RequestQuoteForm.tsx

import Badge from "./Badge";
import BtnComp from "./btn";

export default function RequestQuoteForm() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center z-30">
      <div className="max-w-3xl w-full overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="flex justify-center mb-6">
            <Badge mode="Light" text="Prêt à démarrer ?" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1A2010] mb-4">
            Demander <span className="text-[#6D785A]">Un Devis</span>
          </h1>

          <p className="text-lg text-[#5C5C5C] max-w-125 mx-auto leading-relaxed">
            Que vous soyez syndic, investisseur, foncière ou entreprise, nous
            sommes là pour transformer vos projets en réalité.
          </p>
        </div>

        {/* Form */}
        <form className="px-8 pb-10 space-y-7">
          {/* Nume + Prenume */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
            <div>
              <label
                htmlFor="prenom"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 bg-white focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label
                htmlFor="nom"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Nom
              </label>
              <input
                type="text"
                id="nom"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition"
                placeholder="Votre nom"
              />
            </div>
          </div>

          {/* Entreprise */}
          <div>
            <label
              htmlFor="entreprise"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Entreprise
            </label>
            <input
              type="text"
              id="entreprise"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition"
              placeholder="Nom de votre entreprise"
            />
          </div>

          {/* Email + Telefon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition"
                placeholder="+33 ..."
              />
            </div>
          </div>

          {/* Type de projet */}
          <div>
            <label
              htmlFor="typeProjet"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Type de projet
            </label>
            <input
              type="text"
              id="typeProjet"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition"
              placeholder="Rénovation, construction neuve, investissement..."
            />
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Budget estimé
            </label>
            <input
              type="text"
              id="budget"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition"
              placeholder="20 000 € – 500 000 €"
            />
          </div>

          {/* Descriere */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Décrivez votre projet
            </label>
            <textarea
              id="description"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D785A] focus:border-[#6D785A] outline-none transition resize-y"
              placeholder="Décrivez-nous votre projet en quelques lignes..."
            />
          </div>

          {/* Buton */}
          <div className="pt-4 w-full items-center justify-center flex">
           <BtnComp text="Envoyer le message" />
          </div>
        </form>
      </div>
    </div>
  );
}

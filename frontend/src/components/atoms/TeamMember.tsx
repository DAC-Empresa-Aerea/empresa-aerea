import React from "react";

type TeamMember = {
  name: string;
  photoUrl: string;
  github: string;
  email: string;
  phone: string;
};

const teamMembers: TeamMember[] = [
  { name: "", photoUrl: "", github: "", email: "", phone: "" },
  { name: "", photoUrl: "", github: "", email: "", phone: "" },
  { name: "", photoUrl: "", github: "", email: "", phone: "" },
  { name: "", photoUrl: "", github: "", email: "", phone: "" },
  { name: "", photoUrl: "", github: "", email: "", phone: "" },
];

export const TeamSection: React.FC = () => {
  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
          Nossa Equipe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center transition hover:scale-105 duration-300"
            >
              <div className="w-24 h-24 rounded-full bg-blue-100 mb-4 border-4 border-blue-200 flex items-center justify-center">
                {member.photoUrl ? (
                  <img
                    className="w-24 h-24 rounded-full object-cover"
                    src={member.photoUrl}
                    alt={member.name}
                  />
                ) : (
                  <span className="text-blue-300 text-sm">Sem Foto</span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {member.name || "Nome não informado"}
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>
                  {member.github ? (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      GitHub: {member.github.replace("https://", "")}
                    </a>
                  ) : (
                    "GitHub não informado"
                  )}
                </li>
                <li>{member.email || "Email não informado"}</li>
                <li>{member.phone || "Telefone não informado"}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
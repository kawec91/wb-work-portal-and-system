import ApplicationForm from "@/components/form/AplicationForm";
import Link from "next/link";
import React from "react";

const NewAplicationPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center text-black">
      <div className="bg-white p-8 w-3/5 relative">
        <Link
          href={"/"}
          className="font-bold text-2xl text-red-700 absolute z-10 top-4 right-4 cursor-pointer"
        >
          Zamknij
        </Link>
        <div className="flex flex-col items-start justify-center">
          <div>
            <h3 className="text-center text-2xl pb-4 font-bold">
              Informacje dotyczące dalszej rekrutacji
            </h3>
            <p>
              1. Po zakwalifikowaniu się do kolejnego etapu rekrutacji otrzyma
              Pani/Pan wiaidomość e-mail z formularzem do wypełnienia.
            </p>
            <p>
              2. Wypełniony formularz należy wydrukować, wypełnić oraz umieścić
              na tej stronie w zakładce Profil.
            </p>
            <p>
              3. Po ustaleniu terminu dnia próbnego należy przedłożyć oryginał
              w/w dokumentu w lokalu.
            </p>
            <p>
              4. Po pozytywnym przejściu dnia próbnego otrzyma Pani/Pan kolejną
              wiadomość e-mail z listą dokumentów jakie trzeba przygotować przed
              podjęciem pracy - niestety brak jakiegokolwiek dokumentu
              uniemożliwi nam podpisanie z Państwem umowy.
            </p>
            <p>
              5. W przypadku odrzucenia Państwa zgłoszenia zostaną Państwo o tym
              fakcie poinformowani drogą elektroniczna (e-mail)
            </p>
          </div>
          <div className="py-4 w-full">
            <hr className="border-[2px] border-black/75 min-w-full" />
          </div>
          <div>
            <h3 className="text-center text-2xl pb-4 font-bold">
              Ważne! Rozliczenie dnia próbnego
            </h3>
            <p>1. Dzień próbny składa się zawsze z 5h</p>
            <p>
              2. Stawka godzinowa dnia próbnego to zawsze aktualna najniższa
              krajowa brutto
            </p>
            <p className="font-bold">
              3. Wypłata należności za dzień próbny przelana zostanie na
              wskazany przez aplikanta numer konta bankowego podany w formulażu
              (o którym mowa wyżej).
            </p>
          </div>
          <div className="py-4 w-full">
            <hr className="border-[2px] border-black/75 min-w-full" />
          </div>
          <ApplicationForm />
          {/* {userDocCV.length > 0 ? (
            <UploadedDocumentCard
              id={userDocCV[0].id}
              title={userDocCV[0].documentTitle}
              url={userDocCV[0].documentUrl}
              userEmail={userDocCV[0].userEmail}
              showDeleteBtn={false}
            />
          ) : (
            <NotUploadedDocumentCard
              type="cv"
              checkBoxInfo="Akceptuje regulamin i wyrażam zgodę na przetwarzanie moich danych na potrzeby rekrutacji"
              infoText="Dodaj życiorys"
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default NewAplicationPage;

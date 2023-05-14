import Page from "../layout/Page";
import { useState, useEffect, useContext } from "react";

import { useAuth } from "../context/AuthProvider";
import { getMe } from "../Api/User";

import Spinner from "../components/util/Spinner";

import { useForm } from "react-hook-form";
import { updateMe, resetPassword } from "../Api/User";
import ProfileForm from "../components/Profile/ProfileForm";
import PasswordForm from "../components/Profile/PasswordForm";
import Footer from "../components/Profile/Footer";
import Header from "../components/Profile/Header";
import { AppContext } from "../context/AppProvider";

type Props = {};

interface Profile {
  name: string;
  email: string;
  phone: string;
  isProjectOwner: boolean;
  profileImage: string;
}

const Profile = (props: Props) => {
  const { session } = useAuth();
  const [me, setMe] = useState<Profile | null>(null);
  const [update, setUpdate] = useState(false);
  const { setLoading } = useContext(AppContext);
  const [error, setError] = useState<null | string>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const resetValues = () => {
    setValue("name", me?.name);
    setValue("email", me?.email);
    setValue("phone", me?.phone);
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setError("");
  };

  useEffect(() => {
    const fetchMe = async () => await getMe({ session });
    setLoading(true);
    fetchMe()
      .then((res) => {
        setMe(res.data);
        resetValues();
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (me) {
      resetValues();
    }
  }, [me]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const updateUserPromise = updateMe({ session, data });
      const updatePasswordPromise = resetPassword({
        session,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      const [updateUserResponse, updatePasswordResponse] = await Promise.all([
        updateUserPromise,
        updatePasswordPromise,
      ]);
      if (!updateUserResponse.error && !updatePasswordResponse.error) {
        const newUser: Profile = {
          name: updateUserResponse.data.newUser.name,
          email: updateUserResponse.data.newUser.email,
          phone: updateUserResponse.data.newUser.phone,
          isProjectOwner: updateUserResponse.data.newUser.isProjectOwner,
          profileImage: updateUserResponse.data.newUser.profileImage,
        };
        setMe(newUser);
        setUpdate(false);
        setLoading(false);
      } else {
        setError(
          updatePasswordResponse.error ? updatePasswordResponse.message : null
        );
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("Unkown error", error);
      setLoading(false);
    }
  };

  return (
    <Page title="My Profile">
      {me && (
        <>
          <Header name={me.name} profileImage={me.profileImage} />
          <hr className="mt-4 text-white/10" />

          <ProfileForm
            handleSubmit={handleSubmit}
            register={register}
            update={update}
            onSubmit={onSubmit}
            error={error}
          />

          <Footer
            handleSubmit={handleSubmit}
            setUpdate={setUpdate}
            update={update}
            onSubmit={onSubmit}
            resetValues={resetValues}
          />
        </>
      )}
    </Page>
  );
};
export default Profile;

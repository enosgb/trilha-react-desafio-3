import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdAccountCircle } from "react-icons/md";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import {
  Container,
  Title,
  Column,
  TitleRegister,
  SubtitleLogin,
  JatenhocontaText,
  CriarText,
  Row,
  Wrapper,
} from "./styles";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
export default function Register() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleClickSignIn = () => {
    navigate("/login");
  };

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.post(`/users`, {
        name: control._formValues.name,
        email: control._formValues.email,
        senha: control._formValues.senha,
      });
    } catch (e) {
      //TODO: HOUVE UM ERRO
    }
  };
  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleRegister> Comece agora grátis</TitleRegister>
            <SubtitleLogin>Crie sua conta e make the change.</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Nome completo"
                leftIcon={<MdAccountCircle />}
                name="name"
                control={control}
              />
              <Input
                placeholder="E-mail"
                leftIcon={<MdEmail />}
                name="email"
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input
                type="password"
                placeholder="Senha"
                leftIcon={<MdLock />}
                name="senha"
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button
                title="Criar Minha Conta"
                variant="secondary"
                type="submit"
              />
            </form>
            <Row>
              <SubtitleLogin>
                Ao clicar em "criar minha conta grátis", declaro que aceito as
                Políticas de Privacidade e os Termos de Uso da DIO.
              </SubtitleLogin>
            </Row>
            <Row>
              <JatenhocontaText>já tenho conta.</JatenhocontaText>
              <CriarText onClick={handleClickSignIn}>Fazer login</CriarText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
}

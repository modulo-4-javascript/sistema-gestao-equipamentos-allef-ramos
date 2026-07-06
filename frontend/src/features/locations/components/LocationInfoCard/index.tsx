// import {
//   formatEquipmentDate,
//   getEquipmentTypeLabel,
//   type EquipmentDetail,
// } from '../../types/equipment'
import {
  formatLocationDate,
  getLocationTypeLabel,
  type LocationDetails,
} from "../../types/location";
import {
  Avatar,
  DescriptionList,
  Detail,
  InfoCard,
  // Responsible,
  Term,
  Title,
  Value,
} from "./styles";

interface LocationInfoCardProps {
  location: LocationDetails;
}

export function LocationInfoCard({ location }: LocationInfoCardProps) {
  return (
    <InfoCard styles={{ body: { padding: 24 } }}>
      <Title>Informações gerais</Title>

      <DescriptionList>
        <Detail>
          <Term>Nome</Term>
          <Value>{location.name}</Value>
        </Detail>

        <Detail>
          <Term>Código</Term>
          <Value>{location.code}</Value>
        </Detail>

        <Detail>
          <Term>Tipo</Term>
          <Value>{getLocationTypeLabel(location.type)}</Value>
        </Detail>

        <Detail>
          <Term>Prédio</Term>
          <Value>{location.building ?? "Não informado"}</Value>
        </Detail>

        <Detail>
          <Term>Andar</Term>
          <Value>{location.floor ?? "Não informado"}</Value>
        </Detail>

        <Detail>
          <Term>Quarto</Term>
          <Value>{location.room ?? "Não informado"}</Value>
        </Detail>
        <Detail>
          <Term>Equipamentos</Term>
          <Value>
            <Avatar>{location.equipmentCount ?? 0}</Avatar>
            <span style={{ marginLeft: "8px" }}>vinculados</span>
          </Value>
        </Detail>

        <Detail>
          <Term>Data de cadastro</Term>
          <Value>{formatLocationDate(location.createdAt)}</Value>
        </Detail>

        <Detail>
          <Term>Última atualização</Term>
          <Value>{formatLocationDate(location.updatedAt)}</Value>
        </Detail>
      </DescriptionList>
    </InfoCard>
  );
}

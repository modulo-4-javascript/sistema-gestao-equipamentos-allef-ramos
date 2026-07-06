/**
 * Formata valores textuais opcionais para exibição na tela.
 *
 * Quando o valor não existe, retorna um texto padrão para evitar
 * campos vazios na interface.
 *
 * @param value Valor textual que será exibido.
 * @returns Texto formatado para apresentação.
 */
export function formatNullableText(value?: string | null) {
  return value?.trim() || "Não informado";
}

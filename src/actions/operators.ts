'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAuthProfile } from './auth';

export async function getOperators() {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autenticado');

  try {
    const operators = await prisma.operator.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, operators };
  } catch (error: any) {
    console.error('Erro ao buscar operadores:', error);
    return { success: false, error: 'Erro ao buscar operadores' };
  }
}

export async function createOperator(formData: FormData) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autenticado');

  const name = formData.get('name') as string;
  if (!name || name.trim() === '') {
    return { success: false, error: 'Nome do operador é obrigatório' };
  }

  try {
    const operator = await prisma.operator.create({
      data: {
        profileId: profile.id,
        name: name.trim(),
        isActive: true,
      },
    });
    revalidatePath('/settings');
    return { success: true, operator };
  } catch (error: any) {
    console.error('Erro ao criar operador:', error);
    return { success: false, error: 'Erro ao criar operador' };
  }
}

export async function updateOperator(id: string, formData: FormData) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autenticado');

  const name = formData.get('name') as string;
  if (!name || name.trim() === '') {
    return { success: false, error: 'Nome do operador é obrigatório' };
  }

  try {
    // Verifica pertencimento
    const existing = await prisma.operator.findFirst({
      where: { id, profileId: profile.id }
    });
    if (!existing) return { success: false, error: 'Operador não encontrado' };

    const operator = await prisma.operator.update({
      where: { id },
      data: { name: name.trim() },
    });
    revalidatePath('/settings');
    return { success: true, operator };
  } catch (error: any) {
    console.error('Erro ao atualizar operador:', error);
    return { success: false, error: 'Erro ao atualizar operador' };
  }
}

export async function toggleOperatorStatus(id: string, isActive: boolean) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autenticado');

  try {
    const existing = await prisma.operator.findFirst({
      where: { id, profileId: profile.id }
    });
    if (!existing) return { success: false, error: 'Operador não encontrado' };

    const operator = await prisma.operator.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath('/settings');
    return { success: true, operator };
  } catch (error: any) {
    console.error('Erro ao alterar status do operador:', error);
    return { success: false, error: 'Erro ao alterar status' };
  }
}

export async function deleteOperator(id: string) {
  const profile = await getAuthProfile();
  if (!profile) throw new Error('Não autenticado');

  try {
    const existing = await prisma.operator.findFirst({
      where: { id, profileId: profile.id }
    });
    if (!existing) return { success: false, error: 'Operador não encontrado' };

    await prisma.operator.delete({
      where: { id },
    });
    revalidatePath('/settings');
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao deletar operador:', error);
    return { success: false, error: 'Não é possível excluir um operador que possui histórico. Ao invés disso, desative-o.' };
  }
}

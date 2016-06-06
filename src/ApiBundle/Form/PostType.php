<?php
/**
 * Created by PhpStorm.
 * User: lekskazimirchuk
 * Date: 6/6/16
 * Time: 7:32 PM
 */

namespace ApiBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PostType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder
            ->add('title', TextType::class, [
                'required'  => true,
            ])
            ->add('description', TextType::class, [
                'required'  => true,
            ])
            ->add('body', TextType::class, [
                'required'  => true,
            ]);
    }

    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class'        => 'ApiBundle\Entity\Post',
            'csrf_protection'   => false,
            'allow_extra_fields' => true
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'post';
    }
}
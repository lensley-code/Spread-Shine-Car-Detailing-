interface OfferingFeaturesProps {
  features: string[];
}

const OfferingFeatures = ({ features }: OfferingFeaturesProps) => (
  <ul className="space-y-0">
    {features.map((feature, i) => (
      <li
        key={i}
        className="text-sm font-body text-center py-3 border-t border-border/20 text-muted-foreground"
      >
        {feature}
      </li>
    ))}
  </ul>
);

export default OfferingFeatures;

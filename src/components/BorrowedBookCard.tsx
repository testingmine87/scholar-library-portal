
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, calculateDaysLeft } from "@/lib/dateUtils";

type BorrowedBookProps = {
  id: string;
  title: string;
  author: string;
  issueDate: string;
  returnDate: string;
  fine: number;
  coverImage: string;
};

const BorrowedBookCard = ({
  title,
  author,
  issueDate,
  returnDate,
  fine,
  coverImage,
}: BorrowedBookProps) => {
  const daysLeft = calculateDaysLeft(returnDate);
  const isOverdue = daysLeft < 0;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 flex">
        {/* Book cover */}
        <div className="w-24 h-32 bg-gray-200 flex-shrink-0">
          <img 
            src={coverImage} 
            alt={`Cover of ${title}`} 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        
        {/* Book details */}
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-base line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{author}</p>
          
          <div className="mt-3 flex flex-col space-y-1">
            <div className="flex items-center text-xs text-gray-500">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>Borrowed: {formatDate(issueDate)}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>Due: {formatDate(returnDate)}</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            {isOverdue ? (
              <Badge variant="destructive" className="text-xs">
                Overdue by {Math.abs(daysLeft)} days
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-100 text-blue-700">
                {daysLeft} days left
              </Badge>
            )}
            
            {fine > 0 && (
              <span className="text-xs font-medium text-red-600">
                Fine: ${fine.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BorrowedBookCard;

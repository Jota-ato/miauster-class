import { User } from "@/features/users/types/user.types"
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/shared/components/ui/avatar"

export function UserData({
    user,
    imageOnly = false
}: {
    user: User,
    imageOnly?: boolean
}) {

    const image = user.image ? user.image : "/img/default-avatar.png"
    const firstName = user.name.split(" ")[0]

    return (
        <div className="flex gap-3 items-center">
            <Avatar>
                <AvatarImage
                    src={image}
                />
                <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            {!imageOnly && (
                <div>
                    <p className="text-sm font-semibold">{firstName}</p>
                    <p className="text-xs">{user.email}</p>
                </div>
            )}
        </div>
    )
}